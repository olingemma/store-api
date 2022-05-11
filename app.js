require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connect = require("./db/connect");
const products = require("./routes/products");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// errorMiddleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to store api");
});
app.use("/api/v1/products", products);


// products routes
app.use(notFoundMiddleware);
app.use(errorMiddleware);


// Starting up the server
const start = async () => {
  try {
    await connect();
    app.listen(4000, () => {
      console.log("The server is running at port 4000...")
    })
  } catch (err) {
    console.log(err);
  }
}

start();
