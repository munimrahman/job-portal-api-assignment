const userServices = require("../services/user.services");
const generateToken = require("../utils/generateToken");

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

exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await userServices.findUserByEmail(email);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = user.comparePassword(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    res.status(200).send({
      success: true,
      message: "User Logged In Successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Can not log in",
      error: error.message,
    });
  }
};

exports.getUserInfo = (req, res, next) => {
  const result = userServices.getUserInfoService();
  console.log("Get User Info Route");
  res.send(result);
};
