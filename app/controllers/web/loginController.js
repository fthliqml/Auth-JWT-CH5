async function showLoginPage(req, res, next) {
  try {
    const document = {
      title: "Login Page",
    };
    res.render("./pages/login", { document });
  } catch (error) {
    // Server can't prosessing a request
    error.statusCode = 422;
    next(error);
  }
}

async function handleLogin(req, res, next) {
  try {
    const document = {
      title: "Login Page",
    };
    res.render("./pages/login", { document });
  } catch (error) {
    // Server can't prosessing a request
    error.statusCode = 422;
    next(error);
  }
}

module.exports = { showLoginPage, handleLogin };
