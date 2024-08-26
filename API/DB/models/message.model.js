import { model, Schema, Types } from "mongoose";

//schema
const schema = new Schema({    
    content: String, 
    receiverId:{
        type: Types.ObjectId,
        ref: 'User',
    }
    
}, {
    timestamps: true,
    versionKey: false
})

//model
export const Message = model('Message', schema);