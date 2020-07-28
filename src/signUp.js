function signUp() {
  signUpBtnListener();
}

function signUpBtnListener() {
  let signUpBtn = document.querySelector("#sign-up");
  signUpBtn.addEventListener("click", function (e) {
    createSignUpForm();
  });
}

function createSignUpForm() {
  // clearing detail div
  let detailsDiv = document.querySelector("#detail");
  detailsDiv.innerHTML = "";

  let signUpH3 = document.createElement("h3");
  signUpH3.innerText = "Sign Up";
  detailsDiv.appendChild(signUpH3);

  let signUpForm = document.createElement("form");
  signUpForm.id = "new-signup-form";
  detailsDiv.appendChild(signUpForm);

  let signUpInput1 = document.createElement("input");
  signUpInput1.type = "text";
  signUpInput1.placeholder = "email";
  signUpInput1.name = "email";
  signUpInput1.autocomplete = "off";
  signUpForm.appendChild(signUpInput1);

  let signUpSubmit = document.createElement("input");
  signUpSubmit.type = "submit";
  signUpSubmit.value = "Sign Up";
  signUpSubmit.innerText = "Submit";
  signUpForm.appendChild(signUpSubmit);

  signUpForm.addEventListener("submit", function (e) {
    let newUser = {
      email: e.target.email.value
    };
    e.preventDefault();

    creatingUser(newUser);
    signUpForm.reset();
  });
}

function creatingUser(newUser) {
  fetch(`${BASE_URL}/api/v1/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((resp) => resp.json())
    .then((user) => {
      localStorage.setItem("user_id", `${user.id}`);
      document.querySelector('#logged-in-message').innerText = `You are logged in as: ${newUser.email}`;
      window.alert("Welcome to Cocktail Picker");
      clearContainerContents(document.querySelector('#detail'));
    });
}
