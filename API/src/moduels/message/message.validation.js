import joi from "joi";


export const addMessageVal  = joi.object({
    content: joi.string().required(),
    receiverId:joi.string().required(),
})