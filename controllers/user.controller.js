const userServices = require("../services/user.services");
const { sendMailWithGmail } = require("../utils/email");
const generateToken = require("../utils/generateToken");

exports.signUp = async (req, res, next) => {
  try {
    const user = await userServices.signUpService(req.body);
    const token = user.generateConfirmationToken();
    await user.save({ validateBeforeSave: false });

    const mailData = {
      email: user.email,
      subject: "Verify Your Account",
      text: `Thank you for creating your account. Please confirm your account here: ${
        req.protocol
      }://${req.get("host")}${req.originalUrl}/confirmation/${token}`,
    };

    await sendMailWithGmail(mailData);

    res.status(200).send({
      success: true,
      message: "User Created Successfully",
      data: user,
    });
    console.log("Sign Up Route");
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Can not create user",
      error: error.stack,
    });
  }
};

/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. if not user send res
 * 4. compare password
 * 5. if password not correct send res
 * 6. check if user is active
 * 7. if not active send res
 * 8. generate token
 * 9. send user and token
 */

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

exports.getUserInfo = async (req, res, next) => {
  try {
    const result = await userServices.findUserByEmail(req.user.email);
    res.status(200).send({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Can not get user info",
      error: error.message,
    });
  }
};

exports.confirmEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await userServices.findUserByConfirmationToken(token);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid token",
      });
    }
    const expired = new Date() < user.confirmationTokenExpires;
    if (!expired) {
      return res.status(400).send({
        success: false,
        message: "Token Expired",
      });
    }
    res.status(200).send({
      success: true,
      message: "Email Confirmed Successfully",
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Can not confirmed your email",
      error: error.message,
    });
  }
};
