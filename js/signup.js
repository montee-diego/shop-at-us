// Password math
const form = document.querySelector(".needs-validation");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#confirm-password");

form.addEventListener("submit", e => {
  e.preventDefault();
  e.stopPropagation();

  let isValid = form.checkValidity();

  form.classList.add("was-validated");

  if (isValid) {
    window.location.href = "./signup-complete.html";
  }
});

password.addEventListener("keyup", e => {
  if (e.target.value !== passwordConfirm.value) {
    passwordConfirm.setCustomValidity("Passwords do not match");
  } else {
    passwordConfirm.setCustomValidity("");
  }
});

passwordConfirm.addEventListener("keyup", e => {
  if (e.target.value !== password.value) {
    passwordConfirm.setCustomValidity("Passwords do not match");
  } else {
    passwordConfirm.setCustomValidity("");
  }
});
