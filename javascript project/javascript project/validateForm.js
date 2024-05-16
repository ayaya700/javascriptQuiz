function validateForm(e) {
  e.preventDefault();

  let uservalid = true;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;
  const repass = document.getElementById("repass").value;

  const fnameError = document.getElementById("fnameError");
  const lnameError = document.getElementById("lnameError");
  const emailError = document.getElementById("emailError");
  const passError = document.getElementById("passError");
  const repassError = document.getElementById("repassError");

  if (fname === "" || !/^[a-zA-Z]+$/.test(fname)) {
    fnameError.innerHTML =
      "First name is required and should contain only alphabetical characters.";
    uservalid = false;
  } else {
    fnameError.innerHTML = "";
  }

  if (lname === "" || !/^[a-zA-Z]+$/.test(lname)) {
    lnameError.innerHTML =
      "Last name is required and should contain only alphabetical characters.";
    uservalid = false;
  } else {
    lnameError.innerHTML = "";
  }

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

  if (password !== repass) {
    repassError.innerHTML = "Passwords do not match.";
    uservalid = false;
  } else {
    repassError.innerHTML = "";
  }

  if (uservalid) {
    const user = {
      firstName: fname,
      lastName: lname,
      email: email,
      password: password,
    };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "login.html";
  }
}
