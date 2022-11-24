import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task : {
        type : String,
        required :true
    },
    status : {
        type : String,
        required : true
    },
    author : {
        type:String
    }
},{timestamps:true})

export const todoModel = mongoose.model('Todo',todoSchema)