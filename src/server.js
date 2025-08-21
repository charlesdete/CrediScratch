const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

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
      console.error("❌ Error inserting message:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Message successfully sent!" });
  });
});

//  Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
