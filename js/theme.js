function getSavedTheme() {
  return localStorage.getItem("theme") || "light";
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("themeIcon");
  if (!icon) return;
  // Dark => 🌙, Light => ☀️
  icon.textContent = theme === "dark" ? "🌙" : "☀️";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
}

window.theme = { getSavedTheme, setTheme, toggleTheme };