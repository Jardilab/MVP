const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/errors")

app.use(express.json());

// Import Routes
const products = require("./routes/products");
const users = require("./routes/auth")

// Browser path, modify object by view request
app.use("/api", products);
app.use("/api", users);

//MiddleWare to handle errors
app.use(errorMiddleware)

module.exports = app;


