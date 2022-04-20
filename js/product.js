const url = new URL(window.location.href);
const productId = url.searchParams.get("productId");

const title = document.querySelector(".container-fluid h2");
const reviewsEl = document.querySelector(".reviews");
const relatedTitle = document.querySelector(".same-category h5");
const stock = getRandomNumber(1, 30);

let productData;

async function fetchProduct(slug) {
  const data = await fetchAPI(slug);
  const productDisplay = document.querySelector(".product-display");
  const div = document.createElement("div");
  const catTitle = toTitleCase(data.category);
  const catEncoded = encodeURI(data.category);

  title.innerText = data.title;
  document.title = "Shop@Us | " + data.title;

  div.classList.add("product-wrapper");
  div.innerHTML = `
    <div class="img-wrapper bg-white">
      <img src="${data.image}" class="product-img">
    </div>
    <div class="product-info">
      <a class="text-muted text-decoration-none mb-2 d-block" href="./category.html?category=${catEncoded}">${catTitle}</a>
      <p>${data.description}</p>
      <p class="fw-bold">$${data.price}</p>
      <p class="fst-italic text-muted">Stock: ${stock}</p>
      <div class="d-flex">
        <form class="order d-flex">
          <input type="number" id="quantity" class="form-control quantity" value="1" min="1" max="${stock}" />
          <button type="submit" class="btn btn-primary ms-2 buy-btn">Buy</button>
        </form>
        <button class="btn btn-warning ms-2">Add to Wishlist</button>
      </div>
    </div>
  `;

  productDisplay.append(div);
  productData = data;
  const buyBtn = document.querySelector(".buy-btn");
  buyBtn.addEventListener("click", addToCart);
  relatedTitle.innerText = `More in ${catTitle}`;
  fetchURL(`products/category/${catEncoded}?limit=3`);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

let reviews;
let userReviews = getRandomNumber(1, 15);

async function fetchReviews() {
  const data = await fetch("./utils/reviews.json");

  reviews = await data.json();
}

fetchReviews();

fetchProduct("products/" + productId);

async function fetchUsers(params) {
  const data = await fetchUsersAPI(params);
  const card = document.querySelector(".list-group");

  const randomReviews = (function (arr, num = 1) {
    const tags = [];

    for (let i = 0; i < num; ) {
      const random = Math.floor(Math.random() * arr.length);

      if (tags.indexOf(arr[random]) !== -1) {
        continue;
      }
      tags.push(arr[random]);
      i++;
    }

    return tags;
  })(reviews.reviews, userReviews);

  data.results.map((user, index) => {
    const review = document.createElement("div");

    review.classList.add("list-group-item");
    review.innerHTML = `
      <div class="d-flex flex-start p-2">
        <img src="${user.picture.medium}" class="rounded-circle border border-secondary me-3" width="60" height="60">
        <div>
          <h6 class="fw-bold my-2">${user.name.first} ${user.name.last}</h6>
          <p class="mb-0">${randomReviews[index].text}</p>
        </div>
      </div>
    `;

    card.append(review);
  });

  reviewsEl.style.display = "block";
}

function addToCart(e) {
  e.preventDefault();

  if (!isLogged) {
    window.location.href = `./login.html?redirect=${encodeURI(window.location.href)}`;
  } else {
    const quantity = document.querySelector("#quantity").value;
    cart.push({ product: productData, quantity: quantity, uid: requestUID() });
    localStorage.setItem("cart", JSON.stringify(cart));
    navCartCount.innerText = cart.length;

    // Redirect to order page (disabled)
    // window.location.href = "./order.html";
  }
}

fetchUsers(`?inc=name,picture&results=${userReviews}`);
