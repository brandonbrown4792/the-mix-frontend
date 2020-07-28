function login() {
  loginListener();
  logout();
}

function loginListener() {
  let loginBtn = document.querySelector("#login");
  loginBtn.addEventListener("click", function () {
    creatingLogin();
  });
}

function creatingLogin() {
  // clearing detail div
  let detailsDiv = document.querySelector("#detail");
  detailsDiv.innerHTML = "";

  let loginH3 = document.createElement("h3");
  loginH3.innerText = "Please Login";
  detailsDiv.appendChild(loginH3);

  let loginForm = document.createElement("form");
  loginForm.id = "login-form";
  detailsDiv.appendChild(loginForm);

  let loginInput1 = document.createElement("input");
  loginInput1.type = "text";
  loginInput1.placeholder = "email";
  loginInput1.name = "email";
  loginInput1.autocomplete = "off";
  loginForm.appendChild(loginInput1);

  let loginSubmit = document.createElement("input");
  loginSubmit.type = "submit";
  loginSubmit.value = "Login";
  loginForm.appendChild(loginSubmit);

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let loginInfo = {
      email: e.target.email.value
    };

    loginFetch(loginInfo);
  });
}

function loginFetch(loginInfo) {
  fetch(`https://cocktail-picker-api.herokuapp.com/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo)
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.errors) data.errors.forEach((error) => alert(error));
      else {
        localStorage.setItem("user_id", `${data.id}`);
        window.alert("Welcome to Cocktail Picker");
        document.querySelector('#logged-in-message').innerText = `You are logged in as: ${loginInfo.email}`;
        clearContainerContents(document.querySelector('#detail'));
      }
    });
}

function logout() {
  let logoutBtn = document.querySelector("#logout");
  logoutBtn.addEventListener("click", function () {
    if (!localStorage.getItem('user_id')) {
      alert('Must be logged in to log out');
      return;
    }
    userLogout();
  });
}

function userLogout() {
  if (!localStorage.getItem('user_id')) {
    return;
  }
  if (window.confirm("Are you sure you want to log out?")) {
    localStorage.removeItem("user_id");
    document.querySelector('#logged-in-message').innerText = '';
    clearContainerContents(document.querySelector('#detail'));
  }
}
