window.addEventListener("load", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const auth = localStorage.getItem("authPage");

  localStorage.setItem("currentPage", "/index.html");

  if (!user) {
    window.location.replace(auth || "/pages/login.html");
  }
});

const container = document.getElementById("cardContainer");
let cards = JSON.parse(localStorage.getItem("cards")) || [];

function renderCards() {
  container.innerHTML = ""; 

  cards.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h2>${card.name}</h2>
      <p><strong>Price:</strong> $${card.price}</p>
      <p><strong>Color:</strong> ${card.color}</p>
      <button class="btn btn-edit" onclick="editCard(${index})">Edit</button>
      <button class="btn btn-delete" onclick="deleteCard(${index})">Delete</button>
    `;
    container.appendChild(div);
  });
}

function deleteCard(index) {
  if (confirm("Haqiqatan ham o'chirmoqchimisiz?")) {
    cards.splice(index, 1);
    localStorage.setItem("cards", JSON.stringify(cards));
    renderCards();
  }
}

function editCard(index) {
  const card = cards[index];
  const newName = prompt("Yangi nom:", card.name);
  const newPrice = prompt("Yangi narx:", card.price);
  const newColor = prompt("Yangi rang:", card.color);

  if (newName && newPrice && newColor) {
    cards[index] = {
      name: newName,
      price: newPrice,
      color: newColor,
    };
    localStorage.setItem("cards", JSON.stringify(cards));
    renderCards();
  } else {
    alert("Barcha maydonlarni to‘ldiring!");
  }
}

renderCards();

const malumotlar = document.querySelector(".malumotlar");

if (malumotlar) {
  fetch("https://json-api.uz/api/project/fn37/cars")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Tarmoqda xato bor: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Kegan narsa:", data);
      data.data.forEach((car) => {
        malumotlar.innerHTML += `
          <div class="card">
            <h3>${car.name}</h3>
            <p>${car.price}</p>
            <p>${car.description}</p>
          </div>
        `;
      });
    })
    .catch((error) => {
      console.error("Xatolik yuz berdi:", error);
    });
};

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