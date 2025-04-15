window.addEventListener("load", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem("currentPage", "/smth.html");
  const auth = localStorage.getItem("authPage");

  if (!user) {
    localStorage.setItem("currentPage", "/index.html");
    window.location.replace(auth || "/index.html");
  }
});
