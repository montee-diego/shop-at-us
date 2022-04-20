const orderList = document.querySelector(".order");
const orderTotal = document.querySelector(".total");

let orderPrice = 0;

function getCartItems(data) {
  data.map(item => {
    const div = document.createElement("div");
    const subtotal = item.product.price * item.quantity;

    orderPrice += subtotal;

    div.classList.add("list-group-item");
    div.dataset.uid = item.uid;
    div.innerHTML = `
      <div class="d-flex align-items-center cart-item">
        <div>
        <img src="${item.product.image}" class="me-3">
        </div>
        <div class="d-flex flex-wrap flex-column flex-md-row .align-items-md-center justify-content-between w-100">
          <a href="./product.html?productId=${item.product.id}" class="fw-bold text-decoration-none">${item.product.title}</a>
          
          <p class="mb-0">${item.quantity}x $${item.product.price.toFixed(2)}</p>
          <p class="fw-bold mb-0">$${subtotal.toFixed(2)}</p>
          <div class="item-actions">
            <button class="btn btn-sm btn-link p-0 remove-item">Remove</button>
          </div>
          </div>
        
      </div>
    `;

    orderList.append(div);
  });
  const removeBtn = document.querySelectorAll(".remove-item");
  removeBtn.forEach(btn => btn.addEventListener("click", removeCartItem));

  orderTotal.innerText = `Total: $${orderPrice.toFixed(2)}`;
}

function removeCartItem(e) {
  const target = e.target.closest(".list-group-item");

  console.log(target);
  const index = cart.findIndex(item => item.uid == target.dataset.uid);

  orderPrice -= cart[index].product.price * cart[index].quantity;

  cart.splice(index, 1);
  orderList.removeChild(target);
  localStorage.setItem("cart", JSON.stringify(cart));
  orderTotal.innerText = `Total: $${orderPrice.toFixed(2)}`;
  navCartCount.innerText = cart.length;
  console.log(index);
}

if (cart.length) {
  getCartItems(cart);
}
