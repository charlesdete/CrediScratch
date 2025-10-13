export function handleLogout() {
  // Remove user from localStorage
  localStorage.removeItem("user");

  // Redirect to homepage
  window.location.href = "/";
}
