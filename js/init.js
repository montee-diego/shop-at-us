const navDropDown = document.querySelector("#navbarDropdownMenuLink");
const navLogIn = document.querySelector(".nav-login");
const navLogOut = document.querySelector(".nav-logout");
const navLogOutBtn = document.querySelector(".btn-logout");
const navCartCount = document.querySelector(".cart-count");
const newsletterForm = document.querySelector(".newsletter-form");
const isLogged = localStorage.getItem("user");

let cart;

function loadCart() {
  if (!localStorage.getItem("cart")) {
    cart = [];
  } else {
    cart = JSON.parse(localStorage.getItem("cart"));
  }

  if (isLogged && navLogOut) {
    navCartCount.innerText = cart.length;
  }
}

if (!isLogged) {
  if (navLogIn) navLogIn.style.display = "block";
} else {
  if (navLogOut) {
    navLogOut.style.display = "block";
    navLogOutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      window.location.href = "./logout.html";
    });
  }
}

navDropDown.addEventListener("click", e => {
  e.preventDefault();
});

if (newsletterForm) {
  newsletterForm.addEventListener("submit", e => {
    e.preventDefault();
  });
}

// Helpers
function toTitleCase(str) {
  return str.replace(/(?:^|\s)\w/g, match => {
    return match.toUpperCase();
  });
}

// Load categories
async function fetchAPI(slug) {
  const dataFetch = await fetch(`https://fakestoreapi.com/${slug}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  return await dataFetch.json();
}

async function fetchUsersAPI(params) {
  const dataFetch = await fetch(`https://randomuser.me/api/${params}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  return await dataFetch.json();
}

async function fetchCategories() {
  const data = await fetchAPI("products/categories");
  const listMenu = document.querySelector(".dropdown-menu");

  data.map(cat => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <a class="dropdown-item" href="./category.html?category=${encodeURI(cat)}">${toTitleCase(cat)}</a>
    `;

    listMenu.append(listItem);
  });

  navDropDown.classList.remove("disabled");
}

async function fetchURL(slug) {
  const data = await fetchAPI(slug);
  const products = document.querySelector(".products");

  data.map(product => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <a class="card prod-list h-100 text-decoration-none" href="./product.html?productId=${product.id}">
        <img src="${product.image}" class="card-img-top">
        <div class="card-body">
          <p class="h6">${product.title}</p>
        </div>
        <div class="card-footer fw-bold">
          $${product.price}
        </div>
      </a>
    `;

    products.append(div);
  });
}

const requestUID = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};

loadCart();
fetchCategories();
