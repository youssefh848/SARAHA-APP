import { model, Schema } from "mongoose";

//schema
const schema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    otp: String,
    otpExpired: Date,

}, {
    timestamps: true,
    versionKey: false
})


//model
export const User = model('User', schema)