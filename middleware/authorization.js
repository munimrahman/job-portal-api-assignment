module.exports = (...role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!role.includes(userRole)) {
      return res.status(401).send({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
    next();
  };
};
