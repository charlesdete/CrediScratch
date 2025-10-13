const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// serve static files from uploads folder

//  Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//  Serve uploads as static files
app.use("/uploads", express.static(uploadDir));

//  Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Charlesdete7800@", // your MySQL password
  database: "Credi",
});

// Test DB connection
db.connect((err) => {
  if (err) {
    console.error(" Database connection failed:", err);
  } else {
    console.log(" Connected to MySQL database Credi");
  }
});

//  Donation route
app.post("/donate", (req, res) => {
  const {
    name,
    email,
    phone,
    amount,
    donationType,
    purpose,
    paymentMethod,
    message,
  } = req.body;

  // Check required fields
  if (
    !name ||
    !email ||
    !amount ||
    !donationType ||
    !purpose ||
    !paymentMethod
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Insert into donations table
  const sql = `
    INSERT INTO donations 
    (name, email, phone, amount, donation_type, purpose, payment_method, message) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, phone, amount, donationType, purpose, paymentMethod, message],
    (err, result) => {
      if (err) {
        console.error(" Error inserting donation:", err);
        return res.status(500).json({ error: "Server error" });
      }
      res.json({ success: true, message: "Donation recorded successfully!" });
    }
  );
});

app.post("/volunteer", (req, res) => {
  console.log(" Incoming data:", req.body);
  const { fullName, email, phone, skills, availability, message } = req.body;

  // only require critical fields
  if (!fullName || !email || !availability) {
    return res
      .status(400)
      .json({ error: "Full name, email and availability are required" });
  }

  const sql = `
    INSERT INTO volunteer 
    (full_name, email, phone, skills, availability, message) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      fullName,
      email,
      phone || null,
      skills || null,
      availability,
      message || null,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting volunteer:", err);
        return res.status(500).json({ error: err.message }); // send real error to frontend
      }
      res.json({ success: true, message: "Volunteer recorded successfully!" });
    }
  );
});

// POST: Save message
app.post("/messages", (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // notice: inserting "message" into DB column "content"
  const sql = `
    INSERT INTO messages (name, email, phone, content)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error("Error inserting message:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Message successfully sent!" });
  });
});
app.post("/users", async (req, res) => {
  const { name, phone, email, password } = req.body;
  const role = 0; // default role for normal users

  if (!name || !phone || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if email already exists
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          console.error("Error checking user:", err);
          return res.status(500).json({ error: "Database error" });
        }

        if (results.length > 0) {
          return res.status(400).json({ error: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = `
    INSERT INTO users (name, email, phone, password,role)
    VALUES (?, ?, ?, ?,?)
  `;

        db.query(
          sql,
          [name, email, phone, hashedPassword, role],
          (err, result) => {
            if (err) {
              console.error("Error inserting message:", err);
              return res.status(500).json({ error: "Database error" });
            }
            return res
              .status(201)
              .json({ message: "User created successfully!" });
          }
        );
      }
    );
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: "Server error" });
      if (results.length === 0)
        return res.status(400).json({ error: "Invalid email or password" });

      const user = results[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Send role too
      res.json({
        message: "Login successful!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // 👈 include role
        },
      });
    }
  );
});

// project
app.post("/project", async (req, res) => {
  const { projectName, projectDetails, startDate, leadMember } = req.body;

  if ((!projectName, !projectDetails, !startDate, !leadMember)) {
    return res.status(400).json({ error: "All fields required" });
  }

  const sql = `INSERT INTO project (projectName, projectDetails, startDate, leadMember) 
  VALUES (?, ?, ?, ?)`;

  db.query(
    sql,
    [projectName, projectDetails, startDate, leadMember],
    (err, result) => {
      if (err) {
        console.error("Error inserting project:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "project added successfully sent!" });
    }
  );
});

// fetch from project
// Fetch all projects
app.get("/project", (req, res) => {
  const sql = "SELECT * FROM project";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching projects:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results); // send all projects as JSON
  });
});
//delete project
//  Delete a project by ID
app.delete("/project/:id", (req, res) => {
  const { id } = req.params; // extract id from URL
  const sql = "DELETE FROM project WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting project:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      // no row found with this ID
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  });
});

// edit project
app.put("/project/:id", (req, res) => {
  const { id } = req.params;
  const { projectName, projectDetails, startDate, leadMember } = req.body;

  const sql = `
    UPDATE project 
    SET projectName = ?, projectDetails = ?, startDate = ?, leadMember = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [projectName, projectDetails, startDate, leadMember, id],
    (err, result) => {
      if (err) {
        console.error("Error updating project:", err);
        return res.status(500).json({ error: "Database update failed" });
      }
      res.json({ message: "Project updated successfully", result });
    }
  );
});
// fetch all from donation
app.get("/donations", (req, res) => {
  const sql = "SELECT * FROM donations";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching donation:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results); // send all donations as JSON
  });
});

app.put("/donations/:id", (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    phone,
    amount,
    donationType,
    purpose,
    paymentMethod,
    message,
  } = req.body;

  const sql = `
    UPDATE donations
    SET name = ?, email = ?, phone = ?, amount = ?, donation_type = ?, 
        purpose = ?, payment_method = ?, message = ?
    WHERE id = ?
  `;

  const values = [
    name,
    email,
    phone,
    amount,
    donationType,
    purpose,
    paymentMethod,
    message,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("DB error:", err.sqlMessage);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Donation not found" });
    }
    res.json({ message: "Donation updated successfully", id });
  });
});

// delete donation
app.delete("/donations/:id", (req, res) => {
  const { id } = req.params; // extract id from URL
  const sql = "DELETE FROM donations WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting donation:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      // no row found with this ID
      return res.status(404).json({ error: "Donation not found" });
    }

    res.json({ message: "Donation deleted successfully" });
  });
});

// fetch all from volunteer
app.get("/volunteer", (req, res) => {
  const sql = "SELECT * FROM volunteer";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching volunteer:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results); // send all volunteer as JSON
  });
});

// delete volunteer
app.delete("/volunteer/:id", (req, res) => {
  const { id } = req.params; // extract id from URL
  const sql = "DELETE FROM volunteer WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting volunteer:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      // no row found with this ID
      return res.status(404).json({ error: "Volunteer not found" });
    }

    res.json({ message: "Volunteer deleted successfully" });
  });
});

//  Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed (jpg, jpeg, png)"));
  }
};

const upload = multer({ storage, fileFilter });

//  Route: Create Post
app.post("/post", upload.single("imageFile"), (req, res) => {
  const { imageTitle, imageCategory, description } = req.body;
  const imageFile = req.file ? `/uploads/${req.file.filename}` : null;

  if (!imageFile) {
    return res.status(400).json({ error: "Image is required" });
  }

  const sql = `INSERT INTO posts 
    (imageFile, imageTitle, imageCategory, description, created_at) 
    VALUES (?, ?, ?, ?, NOW())`;

  db.query(
    sql,
    [imageFile, imageTitle, imageCategory, description],
    (err, result) => {
      if (err) {
        console.error(" DB Error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({
        message: " Post created successfully",
        id: result.insertId,
        filePath: imageFile,
      });
    }
  );
});

app.get("/posts", (req, res) => {
  db.query("SELECT * FROM posts ORDER BY created_at DESC", (err, results) => {
    if (err) {
      console.error("Error fetching posts:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Fetch posts by category
app.get("/posts/:category", (req, res) => {
  const { category } = req.params;

  const sql =
    "SELECT * FROM posts WHERE imageCategory = ? ORDER BY created_at DESC";
  db.query(sql, [category], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results); // send posts for this category
  });
});

// Fetch all posts
app.get("/posts", (req, res) => {
  const sql = `
    SELECT 
      id, 
      imageTitle, 
      imageCategory, 
      description, 
      imageFile, 
      created_at
    FROM posts
    ORDER BY created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json(results);
  });
});

// Update a post
app.put("/post/:id", upload.single("imageFile"), (req, res) => {
  const { id } = req.params;
  const { imageTitle, imageCategory, description } = req.body;
  const imageFile = req.file ? `/uploads/${req.file.filename}` : null;

  let sql = `
    UPDATE posts
    SET imageTitle = ?, imageCategory = ?, description = ?
    ${imageFile ? ", imageFile = ?" : ""}
    WHERE id = ?
  `;

  const params = imageFile
    ? [imageTitle, imageCategory, description, imageFile, id]
    : [imageTitle, imageCategory, description, id];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ message: "Post updated", id });
  });
});

// Delete a post
app.delete("/post/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM posts WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ message: "Post deleted", id });
  });
});

// team
app.post("/team", upload.single("memberFile"), (req, res) => {
  const { memberName, memberEmail, memberPosition } = req.body;
  const memberFile = req.file ? `/uploads/${req.file.filename}` : null;

  if (!memberFile) {
    return res.status(400).json({ error: "Member image is required" });
  }

  const sql = `
    INSERT INTO team (memberName, memberEmail, memberPosition, memberFile, created_at)
    VALUES (?, ?, ?, ?, NOW())
  `;

  db.query(
    sql,
    [memberName, memberEmail, memberPosition, memberFile],
    (err, result) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({
        message: "Team member added successfully",
        id: result.insertId,
        imagePath: memberFile,
      });
    }
  );
});

// Delete a team
app.delete("/team/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM team WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ message: "Team deleted", id });
  });
});

// get all team members
app.get("/team", (req, res) => {
  db.query("SELECT * FROM team ORDER BY created_at DESC", (err, results) => {
    if (err) {
      console.error("Error fetching team:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

//  Update a team member
app.put("/team/:id", upload.single("memberFile"), (req, res) => {
  try {
    const { id } = req.params;
    const { memberName, memberEmail, memberPosition } = req.body;
    const memberFile = req.file ? `/uploads/${req.file.filename}` : null;

    //  Validate inputs
    if (!memberName || !memberEmail || !memberPosition) {
      return res.status(400).json({ error: "All fields are required" });
    }

    //  Use 'memberFile' consistently
    let sql = `
      UPDATE team
      SET memberName = ?, memberEmail = ?, memberPosition = ?
      ${memberFile ? ", memberFile = ?" : ""}
      WHERE id = ?
    `;

    const params = memberFile
      ? [memberName, memberEmail, memberPosition, memberFile, id]
      : [memberName, memberEmail, memberPosition, id];

    console.log("🧾 SQL Query:", sql);
    console.log("🧾 Params:", params);

    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(" DB error:", err);
        return res.status(500).json({ error: "Database error", details: err });
      }

      res.json({
        message: " Team member updated successfully",
        id,
        imagePath: memberFile || "Image not changed",
      });
    });
  } catch (error) {
    console.error(" Unexpected server error:", error);
    res
      .status(500)
      .json({ error: "Unexpected server error", details: error.message });
  }
});

//  Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
