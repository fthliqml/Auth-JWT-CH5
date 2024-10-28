function roleCheck(roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      return next();
    }
    res.status(401).json({
      status: "Failed",
      error: "Role is unauthorized !",
      isSuccess: false,
      data: null,
    });
  };
}

module.exports = roleCheck;
