import { addMessageVal } from "../moduels/message/message.validation.js";
import { signVal } from "../moduels/user/user.validation.js"
import { AppError } from "../utils/appError.js";

export const validateUser = () => {
    return (req, res, next) => {
        const { error } = signVal.validate(req.body, { abortEarly: false });

        if (!error) {
            next();
        } else {
            /* res.status(400).json({
                message: "Validation failed",
                errors: error.details.map(detail => ({
                    field: detail.path[0],
                    message: detail.message
                }))
            }); */
            next(new AppError(
                "Validation failed",
                400,
                error.details.map(detail => ({
                    field: detail.path[0],
                    message: detail.message
                }))
            ));
        }
    };
};
export const validateMessage = () => {
    return (req, res, next) => {
        const { error } = addMessageVal.validate(req.body, { abortEarly: false });

        if (!error) {
            next();
        } else {
           /*  res.status(400).json({
                message: "Validation failed",
                errors: error.details.map(detail => ({
                    field: detail.path[0],
                    message: detail.message
                }))
            }); */
            next(new AppError(
                "Validation failed",
                400,
                error.details.map(detail => ({
                    field: detail.path[0],
                    message: detail.message
                    }))
                    ));
        }
    };
};