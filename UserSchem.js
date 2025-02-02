const mongoose = require("mongoose")
const {Schema} = require('mongoose')

const UserSchema = new Schema({
    name:{type:String , required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:["student","supervisor"]},
})

const User = mongoose.model("User",UserSchema)
module.exports = User;