const express = require('express')
const mongoose = require("mongoose")
const db = require('./db')
const app = express()
const userRouter = require("./UserRouter");
const projectRouter=require("./ProjectRouter");
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// mongoDb
const mongoURL = 'mongodb://localhost:27017/Practice' 
mongoose.connect(mongoURL).then(()=>console.log("Mongo Db is connected!"))
.catch((err)=>console.error(err));

app.use("/user", userRouter);
app.use("/project",projectRouter)


//server
app.listen(3000,()=>{
    console.log("server is connected")
})