const app = require("./app")
const connectDataBase = require("./config/database");

// Set file config
const dotenv = require("dotenv");
dotenv.config({path: 'back/config/config.env'})

// Config DB
// connectDataBase({path: 'back/config/config.env'})
connectDataBase()

// Call to sever
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT} in mode: ${process.env.NODE_ENV}`)
})
