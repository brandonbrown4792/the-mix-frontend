function account() {
  accountBtnListener();
}

function accountBtnListener() {
  let accountBtn = document.querySelector("#account");
  accountBtn.addEventListener("click", function () {
    creatingAccountInfo();
  });
}

function creatingAccountInfo() {
  let detailsDiv = document.querySelector("#detail");
  detailsDiv.innerHTML = "";

  let accountH1 = document.createElement("h1");
  accountH1.innerText = "Welcome to The Account Page";
  detailsDiv.appendChild(accountH1);

  let accountDeleteBtn = document.createElement("button");
  accountDeleteBtn.innerText = "DELETE ACCOUNT";
  detailsDiv.appendChild(accountDeleteBtn);
  accountDeleteBtn.addEventListener("click", function () {
    if (localStorage.getItem("user_id") === null) {
      window.alert('Must be signed in to delete account');
      login();
    } else {
      deleteFetch();
    }
  });
}

function deleteFetch() {
  fetch(
    `${BASE_URL}/users/${localStorage.getItem("user_id")}`,
    {
      method: "DELETE",
    }
  )
    .then((resp) => resp.json())
    .then((resp) => {
      document.querySelector('#logged-in-message').innerText = '';
      localStorage.clear("user_id");
    });
}
