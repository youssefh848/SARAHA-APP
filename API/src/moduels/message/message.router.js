import { Router } from "express";
import { verifyToken } from "../../middelware/verifyToken.js";
import { addMessage, deleteMessage, getAllMessage } from "./message.controller.js";
import { validateMessage } from "../../middelware/validation.js";


const messageRouter = Router()


//messageRouter.use(verifyToken)
messageRouter.post('/',validateMessage(), addMessage)
messageRouter.get('/',verifyToken,getAllMessage)
messageRouter.delete('/:id',verifyToken,deleteMessage)


 


export default messageRouter;
