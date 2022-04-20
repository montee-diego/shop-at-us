const url = new URL(window.location.href);
const redirect = url.searchParams.get("redirect");

const signInBtn = document.querySelector(".log-in");
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

signInBtn.addEventListener("click", logInUser);

async function logInUser(e) {
  e.preventDefault();
  alertPlaceholder.innerHTML = "";

  const userName = document.querySelector("#user-name").value;
  const password = document.querySelector("#password").value;

  const users = await fetchAPI("users");

  const loggedUser = users.filter(user => userName == user.username && password == user.password);

  if (loggedUser.length) {
    localStorage.setItem("user", JSON.stringify(loggedUser));
    if (redirect) {
      window.location.href = decodeURI(redirect);
    } else {
      window.location.href = "./index.html";
    }
  } else {
    alert("Log in failed. Please check your username and password and try again.");
  }
}

function alert(message, type) {
  alertPlaceholder.innerHTML = `<div class="alert alert-warning">${message}</div>`;
}
