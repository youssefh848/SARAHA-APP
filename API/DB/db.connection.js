import mongoose from "mongoose";



export const dbConnect = mongoose.connect('mongodb://127.0.0.1:27017/sarahah')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
