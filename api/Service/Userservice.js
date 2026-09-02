const {userSchema}=require("../../schema/users");
const dbConnect=require("../../utils/connectionSetup");
const mongoose=require("mongoose");

const finduserservice=async (condition,dbURL="RENT-V")=>{
    try{
        console.log('entered into find user service with condition',condition);
        const conn=await dbConnect(dbURL);
        const userdetail=await conn.model("User",userSchema,"User").findOne(condition);
        console.log('completed the service find user',userdetail);
        return userdetail
    }catch(error){
        throw error;
    }
}
 
const createuserservice=async(data,dbURL="RENT-V")=>{
    try{
        console.log('entered into service cerate...');
        const conn=await dbConnect(dbURL);
        const userdetails=await conn.model("User",userSchema,"User").create(data);
        console.log('done in the create srvice',userdetails);
        return userdetails;
    }catch(error){
        throw error;
    }
}
const deleteuserservice=async(data,dbURL="RENT-V")=>{
    try{
        console.log('entered into service delete data',data);
        const conn=await dbConnect(dbURL);
        const userdetails=await conn.model("User",userSchema,"User").deleteOne(data);
        console.log('done in the delete srvice',userdetails);
        return userdetails;
    }catch(error){
        throw error;
    }
}
const putuserservice=async(query,data,dbURL="RENT-V")=>{
    try{
        console.log('entered into service put...');
        const username=query
        const updatefields=data
        console.log('data service put...,',username,updatefields);
        const conn=await dbConnect(dbURL);
        const userdetails=await conn.model("User",agentSchema,"User").updateOne(
            username,{$set:updatefields});
        console.log('done in the put srvice',userdetails);
        return userdetails;
    }catch(error){
        throw error;
    }
}
module.exports={createuserservice,finduserservice,deleteuserservice,putuserservice};