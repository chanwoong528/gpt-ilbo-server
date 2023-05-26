require("dotenv").config({ path: "./env/.env" });

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5002
const db = require("./src/Model");
const { swaggerUi, specs } = require("./config/swagger.config.js");


/*Controllers  ************************ */
const userController = require("./src/Controller/userController");
const authController = require("./src/Controller/authController");
/*Controllers  ************************ */



app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://gptilbo-admin.netlify.app/"
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
// ** Controllers **************************


app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(specs))
// ** DB 
db.sequelize.sync().then(() => {
  console.log("db connected");
}).catch((error) => {
  console.warn("db connection Error: ", error)
})
// ** DB 
//Server Up
app.listen(PORT, (err) => {
  if (err) {
    console.log(`Unable to run Server on ${PORT}=> ${err}`);
  } else {
    console.log(`Server Up: ${PORT}`);
  }
});