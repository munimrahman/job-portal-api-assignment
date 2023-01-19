const userServices = require("../services/user.services");

exports.signUp = async (req, res, next) => {
  try {
    const result = await userServices.signUpService(req.body);
    res.status(500).send({
      success: true,
      message: "User Created Successfully",
      data: result,
    });
    console.log("Sign Up Route");
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Can not create user",
      error: error.message,
    });
  }
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
