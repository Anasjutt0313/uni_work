const express = require("express")
const authenticate = require("./Auth")
const project = require("./ProjectSchema");
const User = require("./UserSchem");
const Project = require("./ProjectSchema");
const router = express.Router();

router.post("/createProject",authenticate,async(req,res)=>{
    const rol=await User.findById(req.user.id)
        if(rol.role==="student"){
            const data=req.body;
            data.studentId=req.user.id;
            const obj= await project.create(data);
            return res.json({obj});
        }
        res.json("Only student ca create project");
});

router.put("/updateProject/:id",authenticate,async(req,res)=>{
    const rol=await User.findById(req.user.id)
    if(rol.role==="supervisor"){
        const data = req.body;
        const obj= await project.findByIdAndUpdate(req.params.id,data)
       res.json({"message":"updated",obj})
    }
    res.json("only supervisor can update the project")
})

router.get("/get/:id",authenticate,async(req,res)=>{
    const rol = await User.findById(req.user.id)
    if(rol.role==="supervisor"){
        const obj = await Project.findById(req.params.id)
        res.json({"message":"here is your project",obj})
    }
})

router.delete("/delete/:id",authenticate,async(req,res)=>{
    const rol = await User.findById(req.user.id)
    if(rol.role==="supervisor"){
        const obj = await Project.findByIdAndDelete(req.params.id)
        res.json({"message":"deleted successfully"})
    }
})
module.exports=router;