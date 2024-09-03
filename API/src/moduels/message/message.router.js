import { Router } from "express";
import { verifyToken } from "../../middelware/verifyToken.js";
import { addMessage, deleteMessage, getAllMessage } from "./message.controller.js";
import { errorHandler } from "../../middelware/errorHandellar.js";
import { isValid } from "../../middelware/validation.js";
import { addMessageVal } from "./message.validation.js";


const messageRouter = Router()


messageRouter.post('/',isValid(addMessageVal), errorHandler(addMessage))
messageRouter.get('/',verifyToken,errorHandler(getAllMessage))
messageRouter.delete('/:id',verifyToken,errorHandler(deleteMessage))


 


export default messageRouter;
