const express = require("express");
const app = express();

app.use(express.json());

// Import Routes
const products = require("./routes/products");

// Ruta del browser, objeto de modificación por requiriento de vista
app.use("/api", products);
module.exports = app;
