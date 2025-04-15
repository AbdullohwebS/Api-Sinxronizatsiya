import { login } from "./request.js";
import { validator } from "./utilits.js";

window.addEventListener("load", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const currentPage = localStorage.getItem("currentPage");
  localStorage.setItem("authPage", "/pages/register.html");

  if (user) {
    localStorage.setItem("authPage", "/pages/login.html");

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
        window.location.replace(redirectPage);
      })
      .catch((err) => {
        console.log("Registration failed:", err);
        alert("Registration failed. Please check your details.");
      })
      .finally(() => {
        localStorage.setItem("authPage", "/pages/login.html");

        e.target.dataset.state = "normal";
        e.submitter.disabled = false;
      });
  }
});
