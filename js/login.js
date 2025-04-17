import { login } from "./request.js";
import { validator } from "./utilits.js";

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

window.addEventListener("load", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const currentPage = localStorage.getItem("currentPage");
  localStorage.setItem("authPage", "/pages/login.html");

  if (user) {
    window.location.href = currentPage || "/index.html";
  }
});

const elForm = document.getElementById("form");

elForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const result = {};
  for (const [key, value] of formData.entries()) {
    result[key] = value;
  }

  const checker = validator(result);

  if (checker) {
    alert(checker.message);
    e.target[checker.target].focus();
  } else {
    e.target.dataset.state = "pending";
    e.submitter.disabled = true;

    login(result)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res));

        const redirectPage =
          localStorage.getItem("currentPage") || "/index.html";
        console.log(redirectPage);
        window.location.replace(redirectPage);
      })
      .catch((err) => {
        console.log("Login failed:", err);
        alert("xato to'g'ri yozing");
      })
      .finally(() => {
        e.target.dataset.state = "normal";
        e.submitter.disabled = false;
      });
  }
});
