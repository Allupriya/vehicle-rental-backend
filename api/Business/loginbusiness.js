require("dotenv").config();
const {finduserservice}=require("../Service/Userservice")
const { METHODS, STATUS } = require("../../utils/constants");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Logger = require("../../utils/logger");
const SECRET_KEY=process.env.JWT_SECRET_KEY

const userloginbusiness=async(payload)=>{
//     const logger = new Logger(
//     `${METHODS.ENTERING_TO} || ${METHODS.BUSINESS_METHOD} || ${METHODS.MODULES.PROVIDER.GENERATE_LOGIN_TOKEN}`
//   );
console.log('secret ket is: ',SECRET_KEY)
    try{
        const {username,password}=payload;
        let userdetail=await finduserservice({username});
        if (userdetail){    
            if(userdetail.password===password){
                await generateemailtoken(userdetail.email);
                const login_token=jwt.sign({_id:userdetail._id,
                    username:userdetail.username,
                    role:userdetail.role
                },SECRET_KEY,
            {expiresIn:"1h"});
            return 'Bearer'+' '+login_token;
            }
        }
        else{
            return {
                message:"credentials are wrong"
            }
        }
    }catch(error){
        throw error;
    }
}
module.exports={userloginbusiness};