const express = require("express");
const app = express()
const User = require("./UserSchem");
const Auth = require("./Auth")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const authentication = require("./Auth");
const router = express.Router();
const Jwt_Secret = "hasan"

router.post("/register",async(req,res)=>{
    const data = req.body
    let pass= data.password;
    pass= await bcrypt.hash(pass,10);
    data.password=pass;

    const obj= await User.create(data);
    res.json(obj);
});

router.post("/login",async(req,res)=>{
    const data = req.body;
    const email= await User.findOne({email:data.email});
    console.log(email.password,data.password);
    const ismatch= await bcrypt.compare(email.password,data.password);
    if(!ismatch){
        console.log("Wrong password");
    }
    const token= jwt.sign({id:email._id},Jwt_Secret);
    res.json({token});

})

router.get("/profile",authentication,async(req,res)=>{
    const obj = await User.findById(req.user.id)
    res.json(obj)
})

module.exports = router;
