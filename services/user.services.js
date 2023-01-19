const User = require("../models/User");

exports.signUpService = async (userData) => {
  const result = await User.create(userData);
  return result;
};

exports.logInService = () => {
  return "Log In Services";
};

exports.getUserInfoService = () => {
  return "Get User Info Services";
};
