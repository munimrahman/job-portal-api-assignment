const userServices = require("../services/user.services");

exports.signUp = (req, res, next) => {
  const result = userServices.signUpService();
  console.log("Sign Up Route");
  res.send(result);
};

exports.logIn = (req, res, next) => {
  const result = userServices.logInService();
  console.log("Log In Route");
  res.send(result);
};

exports.getUserInfo = (req, res, next) => {
  const result = userServices.getUserInfoService();
  console.log("Get User Info Route");
  res.send(result);
};
