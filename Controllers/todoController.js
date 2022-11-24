import mongoose from "mongoose";
import { todoModel } from "../Models/todoModel.js";

export const todoController = {
  createTodo: (req, res) => {
    const {task,status} = req.body
    const author = req.user.userId

    try {
        todoModel.create({task,status,author}).then(()=>{
            res.status(200).json({msg:'todo is created'})
        }).catch((error)=>{
            res.status(500).json({error:error.message})
        })        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
  },
  getTodo: (req,res) => {
    const user_id = req.user.userId
    try {
        todoModel.find({author:mongoose.Types.ObjectId(user_id)}).then((todos)=>{
            res.status(200).json({todos})
        }).catch((error)=>{
            res.status(500).json({error:error.message})
        }) 
    } catch (error) {
        res.status(500).json({error:error.message})
    }
  },
  editTodo:(req,res)=>{
    const todoId = req.params.id
    const data = req.body
    try {
        todoModel.findByIdAndUpdate(todoId,{
            $set : data
        },{new:true}).then(()=>{
            res.status(200).json({msg:'todo is updated'})
        }).catch((error)=>{
            res.status(500).json({error:error.message})
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
  },
  deleteTodo:(req,res)=>{
    const todoId = req.params.id
    try {
        todoModel.findByIdAndDelete(todoId).then(()=>{
            res.status(200).json({msg:'todo is deleted'})
        }).catch((error)=>{
            res.status(500).json({error:error.message})
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
  }
};
