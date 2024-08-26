import { Router } from "express";
import { confirmEmail, login, registration, resendOtp } from "./user.controller.js";
import { checkEmail } from "../../middelware/checkEmail.js";
import { validateUser } from "../../middelware/validation.js";



const userRouter = Router()
userRouter.post('/registration', validateUser(), checkEmail, registration)
userRouter.post('/login', login)
userRouter.post('/verifyEmail', confirmEmail)
userRouter.get('/resendOTP/:token', resendOtp)





export default userRouter; 