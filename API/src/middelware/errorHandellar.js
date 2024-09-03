import { AppError } from "../utils/appError.js";


export function errorHandler(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            next(new AppError(err.message, err.statusCode || 500));
        });

    }
}