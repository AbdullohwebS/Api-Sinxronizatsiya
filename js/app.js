window.addEventListener("load", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const auth = localStorage.getItem("authPage");

  localStorage.setItem("currentPage", "/index.html");

  if (!user) {
    window.location.replace(auth || "/pages/login.html");
  }
});
