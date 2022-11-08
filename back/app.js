const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/errors")
const cookieParser = require("cookie-parser")

// Using imported constants
app.use(express.json());
app.use(cookieParser());

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