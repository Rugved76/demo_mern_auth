import { userRouter } from './routes/user.js'
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'

const DB_URL = 'mongodb+srv://rugvedwagh02:rugved76@demo2decrecipe.obznib4.mongodb.net/?retryWrites=true&w=majority'
const CLIENT_URL = 'http://localhost:3000'
const PORT = 4000

const app = express();

app.use(express.json());
app.use(cors({credentials:true, origin:CLIENT_URL}))
app.use("/auth",userRouter)

mongoose.connect(
    DB_URL
).then(()=>{
    console.log(`Connected to the database!`);
}).catch((e)=>{
    console.log(`Failed to connect to the database : ${e}`);
})

app.listen(PORT, ()=>{
    console.log(`\n\nServer running on port : ${PORT}`);
})