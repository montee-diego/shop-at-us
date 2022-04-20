const url = new URL(window.location.href);
const category = url.searchParams.get("category");
const displayCategory = toTitleCase(category);

const title = document.querySelector(".container-fluid h2");
title.innerText = `Products in ${displayCategory}`;
document.title = `Shop@Us | ${displayCategory}`;

// async function fetchCategory(slug) {
//   const data = await fetchAPI(slug);
//   const products = document.querySelector(".products");

//   data.map(product => {
//     const div = document.createElement("div");
//     div.classList.add("col");
//     div.innerHTML = `
//       <a class="card h-100 text-decoration-none" href="./product.html?productId=${product.id}">
//         <img src="${product.image}" class="card-img-top">
//         <div class="card-body">
//           <p class="h6">${product.title}</p>
//         </div>
//         <div class="card-footer fw-bold">
//           $${product.price}
//         </div>
//       </a>
//     `;

//     products.append(div);
//   });
// }

fetchURL("products/category/" + category);
