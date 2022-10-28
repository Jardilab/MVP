const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please, imput your name"],
        maxlength: [120, "Name cannot exceed 120 characters"]
    },
    email: {
        type: String,
        required: [true, "Please, input your email"],
        unique: true,
        validate: [validator.isEmail, "Please, input a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please, input a password"],
        minlength: [8, "Password requires a minimum of 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createAt: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

module.exports = mongoose.model("auth", userSchema)