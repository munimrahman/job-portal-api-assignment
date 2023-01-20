const jwt = require("jsonwebtoken");
const { promisify } = require("util");

/**
 * 1. check if token exists
 * 2. if not token send res
 * 3. decode the token
 * 4. if valid next
 */

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "You are not authenticated",
      });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
