const {createvehiclebusiness,getvehiclebusiness,deletevehiclebusiness,putvehiclebusiness}=require("../Business/VehicleBusiness");

const sendResponse=require("../../utils/response");
const createvehiclecontroller=async (req,res)=>{
     try{
        console.log('entered into controller ');
        const resp=await createvehiclebusiness(req.body,req.query);
        console.log('completed the controller ',resp);
        return sendResponse(res, 200, true, 'Vehicle created successfully', resp);
    }catch(error){
        console.error('Error in create Vehicle controller:', error);
        return sendResponse(res, 500, false, 'Failed to create Vehicle', error.message);
    }


}
const getvehiclecontroller=async (req,res)=>{
    try{
        const resp=await getvehiclebusiness(req.query.vehicleId);
        return res.status(200).json({
            message:resp
        });
    }catch(error){
    console.error('Error in get Vehicle controller:', error);
    return sendResponse(res, 500, false, 'Failed to get Vehicle', error.message);

    }
}
const deletevehiclecontroller=async(req,res)=>{
try{
    const resp=await deletevehiclebusiness(req.query.vehicleId);
        return res.status(200).json({
            message:resp
        });
    }catch(error){
    console.error('Error in get Vehicle controller:', error);
    return sendResponse(res, 500, false, 'Failed to get Vehicle', error.message);
}
}
const putvehiclecontroller=async(req,res)=>{
try{
    const resp=await putvehiclebusiness(req.query,req.body);
        return res.status(200).json({
            message:resp
        });
    }catch(error){
    console.error('Error in get Vehicle controller:', error);
    return sendResponse(res, 500, false, 'Failed to get Vehicle', error.message);
}
}
module.exports={createvehiclecontroller,getvehiclecontroller,deletevehiclecontroller,putvehiclecontroller};