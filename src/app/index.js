const express = require("express");
const morgan = require("morgan");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const router = require("../config/routes");
// const session = require("express-session");

const app = express();

// Reading static files in specific folder
app.use(express.static(__dirname + "/../public"));
// Set view engine
app.set("view engine", "ejs");
// Set views directory
app.set("views", path.join(__dirname, "/views"));
// Using ejs layouting
app.use(expressLayouts);
// Install request logger
app.use(morgan("dev"));
// Install JSON request parser
app.use(express.json());
// Install Body Parser
app.use(express.urlencoded({ extended: true }));
// // Trust first proxy
// app.set("trust proxy", 1);
// // Set session options
// app.use(
//   session({
//     secret: process.env.COOKIE_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 60000, // (Milidetik) 1m  -> Setelah exp, data yang disimpan di session akan hilang
//       httpOnly: true,
//       sameSite: "lax", // Mencegah CSRF (Cross-Site Request Forgery)
//     },
//   })
// );
// Routing
app.use(router);

module.exports = app;
