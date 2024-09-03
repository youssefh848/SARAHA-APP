import { Router } from "express";
import { confirmEmail, login, registration, resendOtp } from "./user.controller.js";
import { checkEmail } from "../../middelware/checkEmail.js";
import { isValid } from "../../middelware/validation.js";
import { errorHandler } from "../../middelware/errorHandellar.js";
import { signVal } from "./user.validation.js";



const userRouter = Router()
userRouter.post('/registration', isValid(signVal), checkEmail, errorHandler(registration))
userRouter.post('/login', login)
userRouter.post('/verifyEmail', errorHandler(confirmEmail))
userRouter.get('/resendOTP/:token', errorHandler(resendOtp))





export default userRouter; 