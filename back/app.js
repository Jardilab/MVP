const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/errors")
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

// Using imported constants
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Import Routes
const products = require("./routes/products");
const users = require("./routes/auth")
const orders = require("./routes/orders")

// Browser path, modify object by view request
app.use("/api", products);
app.use("/api", users);
app.use("/api", orders);

//MiddleWare to handle errors
app.use(errorMiddleware)

module.exports = app;