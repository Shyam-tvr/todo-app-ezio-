import express from 'express'
import mongoose from 'mongoose'
import {authRouter} from './Routes/authRoute.js'
import { userRouter } from './Routes/userRoute.js'

const app = express()
app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/',userRouter)

mongoose.connect('mongodb://localhost:27017/todoapp').then(()=>{
    console.log("Database Connected Successfully")
}).catch((error)=>{
    console.log(error)
})

app.listen(3000,()=>{
    console.log("Connected to the server")
})