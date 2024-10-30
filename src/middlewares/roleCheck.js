function roleCheck(roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      return next();
    }
    // Forbidden access
    res.status(403).json({
      status: "Failed",
      error: "Role is unauthorized !",
      isSuccess: false,
      data: null,
    });
  };
}

module.exports = roleCheck;
