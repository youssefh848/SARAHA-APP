import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";


export const verifyToken = (req, res, next) => {
    const { token } = req.headers
    jwt.verify(token, 'youssef', (err, decoded) => {
        if (err) {
           // return res.status(401).json({ message: 'Invalid token' })
           next(new AppError('Invalid token', 401))

        }
        req.user = decoded
        next()
    })
}


