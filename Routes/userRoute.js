import express from 'express'
import { todoController } from '../Controllers/todoController.js'
import { verifyToken } from '../middlewares/Authenticate.js'
export const userRouter = express.Router()

userRouter.post('/',verifyToken, todoController.createTodo)
userRouter.get('/',verifyToken,todoController.getTodo)
userRouter.put('/:id',verifyToken,todoController.editTodo)
userRouter.delete('/:id',verifyToken,todoController.deleteTodo)