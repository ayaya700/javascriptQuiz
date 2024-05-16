function validateForm(e) {
  e.preventDefault();

  let uservalid = true;
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  const emailError = document.getElementById("emailError");
  const passError = document.getElementById("passError");

  const user = JSON.parse(localStorage.getItem("user"));

  if (
    email === "" ||
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
  ) {
    emailError.innerHTML =
      "Email is required and should be a valid email address.";
    uservalid = false;
  } else {
    emailError.innerHTML = "";
  }

  if (password.length < 8) {
    passError.innerHTML = "Password should be at least 8 characters long.";
    uservalid = false;
  } else {
    passError.innerHTML = "";
  }

  if (user && user.email !== email) {
    emailError.innerHTML = "Email does not match.";
    uservalid = false;
  } else if (user) {
    emailError.innerHTML = "";
  }

  if (user && user.password !== password) {
    passError.innerHTML = "Password does not match.";
    uservalid = false;
  } else if (user) {
    passError.innerHTML = "";
  }

  if (uservalid) {
    window.location.href = "quiz.html";
  }
}
