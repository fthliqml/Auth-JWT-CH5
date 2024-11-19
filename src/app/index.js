const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const router = require("../config/routes");

const app = express();

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  process.env.CORS_ORIGIN_DEVELOPMENT,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
  })
);

// Install request logger
app.use(morgan("dev"));
// Install JSON request parser
app.use(express.json());
// Install Body Parser
app.use(express.urlencoded({ extended: true }));
// Install Cookie Parser
app.use(cookieParser());
// POST override example -> /resource?_method=DELETE
app.use(methodOverride("_method"));

// Routing
app.use(router);

module.exports = app;
