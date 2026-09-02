const jwt=require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY=process.env.JWT_SECRET_KEY
const {BLACKLIST}=require("./constant")

const verifylogintoken=async (req,res,next)=>{
    const authheader=req.headers.authorization;
    if(BLACKLIST.includes(req.url)){
        return next();
    }
    if(!authheader || !authheader.startsWith('Bearer')){
        return res.status(401).json({message:'header missing'});
    }
    const token=authheader.split(' ')[1];
    try{
        //console.log(token,SECRET_KEY);
        const decode=jwt.verify(token,SECRET_KEY);
        req.user=decode;
    //     const userProfile = {
    //       user_id: decode.user_id,
    //       username: decode.username,
    //       email: decode.email
    // };
        next();
    }catch(err){
        return res.status(401).json({message:'Invalid token'});
    }
};
module.exports={verifylogintoken};