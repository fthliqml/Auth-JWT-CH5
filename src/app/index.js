const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("../config/routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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

// Routing
app.use(router);

module.exports = app;
