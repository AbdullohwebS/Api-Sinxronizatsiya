window.addEventListener("load", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem("currentPage", "/smth.html");
  const auth = localStorage.getItem("authPage");

  if (!user) {
    localStorage.setItem("currentPage", "/index.html");
    window.location.replace(auth || "/index.html");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "true") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

darkM.onclick = () => {
  toggle(!document.documentElement.classList.contains("dark"));
};

function toggle(isDark) {
  document.documentElement.classList.toggle("dark");

  localStorage.setItem("theme", isDark ? "true" : "false");
}

window.addEventListener("storage", (e) => {
  if (e.newValue === "true") {
    toggle(true);
  } else {
    toggle(false);
  }
});
