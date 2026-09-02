const {agentSchema}=require("../../schema/users");
const dbConnect=require("../../utils/connectionSetup");
const mongoose=require("mongoose");

const findagentservice=async (condition,dbURL="RENT-V")=>{
        try{
            console.log('entered into find agent service with condition',condition);
            const conn=await dbConnect(dbURL);
            const agentdetail=await conn.model("Agent",agentSchema,"Agent").findOne(condition);
            console.log('completed the sevice find agent',agentdetail);
            return agentdetail
        }catch(error){
            throw error;
        }
}

const createagentservice=async(data,dbURL="RENT-V")=>{
        try{
            console.log('entered into service create...');
            const conn=await dbConnect(dbURL);
            const agentdetails=await conn.model("Agent",agentSchema,"Agent").create(data);
            console.log('done in the create service',agentdetails);
            return agentdetails;
        }catch(error){
            throw error;
        }
}
const deleteagentservice=async(data,dbURL="RENT-V")=>{
        try{
            console.log('entered into serive delete');
            const conn=await dbConnect(dbURL);
            const agentdetails=await conn.model("Agent",agentSchema,"Agent").deleteOne(data);
            console.log('done in the delete service',agentdetails);
            return agentdetails;
        }catch(error){
            throw error;
        }


}
const putagentservice=async(query,data,dbURL="RENT-V")=>{
    try{
        console.log('entered into service put...');
        const username=query
        const updatefields=data
        console.log('data service put...,',username,updatefields);
        const conn=await dbConnect(dbURL);
        const userdetails=await conn.model("Agent",agentSchema,"Agent").updateOne(
            username,{$set:updatefields});
        console.log('done in the put srvice',userdetails);
        return userdetails;
    }catch(error){
        throw error;
    }
}
module.exports={createagentservice,findagentservice,deleteagentservice,putagentservice};