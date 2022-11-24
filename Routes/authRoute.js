import express from 'express'
import { authController } from '../Controllers/authController.js'
export const authRouter = express.Router()

authRouter.post('/signup',authController.doSignup)
authRouter.post('/login',authController.doLogin)