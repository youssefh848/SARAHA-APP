import { Message } from "../../../DB/models/message.model.js"


// add message
const addMessage = async (req, res, next) => {
    // get data 
    const { content, receiverId } = req.body
    Message.create({
        content,
        receiverId,
    })
    // const message = await Message.insertMany(req.body)
    res.status(201).json({ message: "Message added sucessfully", sucess: true })
}

//get all message for this user
const getAllMessage = async (req, res, next) => {
    const userId = req.user.id
    const messages = await Message.find({ receiverId: userId })
    res.status(200).json(messages)
}

// delete message
const deleteMessage = async (req, res, next) => {
    const messageId = req.params.id
    const message = await Message.findByIdAndDelete(messageId)
    res.status(200).json({ message: "Message deleted sucessfully", sucess: true })
    }









export {
    addMessage,
    getAllMessage,
    deleteMessage

}