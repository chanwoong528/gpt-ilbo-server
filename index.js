require("dotenv").config({ path: "./env/.env" });



const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5002

const db = require("./src/Model");


app.use(
  cors({
    origin: [
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["HEAD", "POST", "PUT", "GET", "PATCH", "DELETE"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// ** Controllers

// ** Controllers
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