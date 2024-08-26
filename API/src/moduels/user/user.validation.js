import joi from "joi";


export const signVal = joi.object({
    username: joi.string().min(5).max(8).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    confirmPassword: joi.valid(joi.ref('password')).required()
})