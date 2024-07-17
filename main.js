// select all dom objects
let form = document.getElementsByTagName("form")[0];
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let passWord = document.querySelector("#passWord");
let rePassWord = document.querySelector("#rePassWord");
let submit = document.getElementsByTagName("button")[0];
let inputs = document.querySelectorAll("input");
// start the logic
// function for error handling
function setError(element, msg) {
  let elementParent = element.parentElement;
  let msgContainer = elementParent.querySelector(".error");
  msgContainer.innerText = `${msg}`;
  element.classList.add("failed");
  element.classList.remove("success");
}
// finction for validInput handling
function setSuccess(element) {
  let elementParent = element.parentElement;
  let msgContainer = elementParent.querySelector(".error");
  msgContainer.innerText = "";
  element.classList.remove("failed");
  element.classList.add("success");
}
let valid = false;
// prevent the default behavoir of the from
form.addEventListener("submit", (e) => {
  e.preventDefault();
  valid = inputsValidation();
  if (valid) {
    form.submit();
  }
});
// function to validateEmail
function validateEmail(emailValue) {
  let reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return reg.test(emailValue.toString().toLowerCase());
}
// function for password Vlaidation
function passWordValidate(pass) {
  let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
  return reg.test(pass);
}
//general function to validate the feild
function feildValidation(element, validateFun, emptyMsg, invalidMsg) {
  let value = element.value.trim();
  if (value === "") {
    setError(element, emptyMsg);
  } else if (validateFun && !validateFun(value)) {
    setError(element, invalidMsg);
  } else {
    setSuccess(element);
    return true;
  }
}
// function for inputsValidation
function inputsValidation() {
  let one = feildValidation(name, null, "Name is required!", "");
  let two = feildValidation(
    email,
    validateEmail,
    "Email is required!",
    "Email is not valid!"
  );
  let three = feildValidation(
    passWord,
    passWordValidate,
    "Password is required!",
    "Minimum eight characters, at least one letter and one number!"
  );
  let four = feildValidation(
    rePassWord,
    (val) => val === passWord.value.trim(),
    "Confirm Password is required!",
    "Confirm Password don't match the Password"
  );
  if (one && two && three && four) return true;
}
//function to add eventListerner for each input
function addBlurEventListener(element, validateFun, emptyMsg, invalidMsg) {
  element.addEventListener("blur", () => {
    feildValidation(element, validateFun, emptyMsg, invalidMsg);
  });
}
// add event listener for all inputs
addBlurEventListener(name, null, "Name is required!", "");
addBlurEventListener(
  email,
  validateEmail,
  "Email is required!",
  "Email is not valid!"
);
addBlurEventListener(
  passWord,
  passWordValidate,
  "Password is required!",
  "Minimum eight characters, at least one letter and one number!"
);
addBlurEventListener(
  rePassWord,
  (val) => val === passWord.value.trim(),
  "Confirm Password is required!",
  "Confirm Password don't match the Password"
);
