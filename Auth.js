const jwt = require("jsonwebtoken")
const Jwt_Secret = "hasan"

const authentication = (req,res,next)=>{
    const authheader=req.headers.authorization;

    if(!authheader){
        console.log("Header missing");
    }
     const token=authheader.split(" ")[1];

     if(!token){
        console.log("Token missing");
     }

     try{
        const dataa= jwt.verify(token, Jwt_Secret);
     req.user=dataa;
     next();
     }catch(error){
        console.log("VErification error",error);
     }
     
}

 module.exports=authentication;