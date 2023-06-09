require("dotenv").config({ path: "./env/.env" });

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5002
const db = require("./src/Model");
const { swaggerUi, specs } = require("./config/swagger.config.js");

const userController = require("./src/Controller/userController");
const authController = require("./src/Controller/authController");
const gptController = require("./src/Controller/gptController");
const cateController = require("./src/Controller/cateController")

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://gptilbo-admin.netlify.app"
    ],
    credentials: true,
    methods: ["HEAD", "POST", "PUT", "GET", "PATCH", "DELETE"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());


// ** Controllers ************************
app.use("/user", userController)
app.use("/auth", authController)
app.use("/gpt", gptController);
app.use("/category", cateController);
// ** Controllers **************************

// ** Swagger
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(specs))
// ** Swagger

// DB Connection
db.sequelize.sync()
  .then(() => {
    console.log("db connected");
  }).catch((error) => {
    console.warn("db connection Error: ", error)
  })
// DB Connection

//Server Up
app.listen(PORT, (err) => {
  if (err) {
    console.log(`Unable to run Server on ${PORT}=> ${err}`);
  } else {
    console.log(`Server Up: ${PORT}`);
  }
});