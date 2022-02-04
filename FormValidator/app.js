const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

// Show Input Error Messages
const showError = (input, message) => {
   const formControl = input.parentElement;
   formControl.className = "form-control error";
   const small = formControl.querySelector("small");
   small.innerText = message;
};

// Show Input Success outline
const showSuccess = (input) => {
   const formControl = input.parentElement;
   formControl.className = "form-control success";
};

// Check if email is valid
const checkEmail = (input) => {
   const reg =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
   if (reg.test(input.value.trim())) {
      showSuccess(input);
   } else {
      showError(input, `${getFieldName(input)} is not valid.`);
   }
};

// Check Required Field
const checkRequired = (inputArr) => {
   inputArr.forEach((input) => {
      if (input.value.trim() === "") {
         showError(input, `${getFieldName(input)} is required.`);
      } else {
         showSuccess(input);
      }
   });
};

// Check if both password match

const checkPassword = (input1, input2) => {
   if (input1.value !== input2.value) {
      showError(input2, "Passwords do not match.");
   }
};

const checkLength = (input, min, max) => {
   if (input.value.length < min) {
      showError(
         input,
         `${getFieldName(input)} must have at least ${min} words.`
      );
   } else if (input.value.length > max) {
      showError(
         input,
         `${getFieldName(input)} should be less than ${max} words.`
      );
   } else {
      checkRequired([username, email, password, password2]);
   }
};

const getFieldName = (input) => {
   return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Event Listeners
form.addEventListener("submit", function (e) {
   e.preventDefault();
   checkRequired([username, email, password, password2]);
   checkLength(username, 4, 15);
   checkLength(password, 6, 20);
   checkEmail(email);
   checkPassword(password, password2);
});
