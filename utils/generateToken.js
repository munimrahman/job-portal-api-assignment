const jwt = require("jsonwebtoken");

module.exports = generateToken = (userInfo) => {
  const payload = {
    email: userInfo.email,
    role: userInfo.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
