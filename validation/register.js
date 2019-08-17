const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters long";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Must be a valid email";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 32 })) {
    errors.password = "Password must be between 6 and 32 characters long";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.equals(data.password2, data.password)) {
    errors.password2 = "Password fields must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
