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
    res.status(201).json({ message: "Message added sucessfully", success: true })
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
    const messageExist = await Message.findById(messageId)
    if (!messageExist) {
        return res.status(404).json({ message: "Message not found", success: false })
    }
    // check if userId = reciverId login
    if (messageExist.receiverId.toString() !== req.user.id) {
        return res.status(403).json({ message: "You are not authorized to delete this message ", success: false })
    }
    // delete message
    const message = await Message.findByIdAndDelete(messageId)
    res.status(200).json({ message: "Message deleted successfully", success: true })
}









export {
    addMessage,
    getAllMessage,
    deleteMessage

}