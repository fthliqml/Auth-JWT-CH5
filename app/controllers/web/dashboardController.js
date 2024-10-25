async function showDashboardPage(req, res, next) {
  try {
    if (!req.session.accessToken) {
      return res.redirect("/login");
    }
    const document = {
      title: "Dashboard",
    };
    res.render("./pages/dashboard", { document });
  } catch (error) {
    // Server can't prosessing a request
    error.statusCode = 422;
    next(error);
  }
}

module.exports = { showDashboardPage };
