const express = require("express");
const { API } = require("../server/routes/consts.js");
const router = require("../server/routes/index.js");
const { db } = require("../database/models");
const cors = require("cors");
let cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
    ],
    exposedHeaders: ["set-cookie"],
    credentials: true,
    optionSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET || "secret_key"));
app.use(API, router);

start = async () => {
  try {
    app.listen(port, () => console.log(`server is running...`));
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: true });
  } catch (e) {
    console.log("server error: ", e);
  }
};

start();