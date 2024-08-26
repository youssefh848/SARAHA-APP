import { User } from "../../DB/models/user.model.js";
import { AppError } from "../utils/appError.js";



export const checkEmail = async (req, res, next) => {
    const { email } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
       // return res.status(400).json({ message: "User already exist" });
       return next(new AppError("User already exist", 400))

    }
    next()

}