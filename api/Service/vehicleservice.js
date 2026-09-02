const {vehicleSchema}=require("../../schema/users");
const dbConnect=require("../../utils/connectionSetup");
const mongoose=require("mongoose");
const findvehicleservice=async (condition,dbURL="RENT-V")=>{
        try{
            console.log('entered into find vehicle service with condition',condition);
            const conn=await dbConnect(dbURL);
            const vehicledetail=await conn.model("Vehicle",vehicleSchema,"Vehicle").findOne(condition);
            console.log('completed the sevice find vehicle',vehicledetail);
            return vehicledetail
        }catch(error){
            throw error;
        }
}

const createvehicleservice=async(data,dbURL="RENT-V")=>{
        try{
            console.log('entered into service create...');
            const conn=await dbConnect(dbURL);
            const vehicledetails=await conn.model("Vehicle",vehicleSchema,"Vehicle").create(data);
            console.log('done in the create service',vehicledetails);
            return vehicledetails;
        }catch(error){
            throw error;
        }
}
const deletevehicleservice=async(data,dbURL="RENT-V")=>{
        try{
            console.log('entered into serive delete');
            const conn=await dbConnect(dbURL);
            const vehicledetails=await conn.model("Vehicle",vehicleSchema,"Vehicle").deleteOne(data);
            console.log('done in the delete service',vehicledetails);
            return vehicledetails;
        }catch(error){
            throw error;
        }


}
const putvehicleservice = async (query, data, dbURL = "RENT-V") => {
    try {
        console.log('entered into service put...');
        const conn = await dbConnect(dbURL);

        // Clean the payload: remove undefined, null, empty string, or dummy string
        const cleanedData = {};
        for (let key in data) {
            if (data[key] !== undefined 
                && data[key] !== null 
                && data[key] !== "" 
                && data[key] !== "string" 
                && data[key] !== 0) {
                cleanedData[key] = data[key];
            }
        }

        console.log('Cleaned data for update:', cleanedData);

        const vehicledetails = await conn.model("Vehicle", vehicleSchema, "Vehicle").updateOne(
            query,
            { $set: cleanedData }
        );

        console.log('done in the put service', vehicledetails);
        return vehicledetails;
    } catch (error) {
        throw error;
    }
};


module.exports={findvehicleservice,createvehicleservice,deletevehicleservice,putvehicleservice};