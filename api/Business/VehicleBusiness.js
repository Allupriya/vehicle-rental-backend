const {createvehicleservice,findvehicleservice,getvehicleservice,deletevehicleservice,putvehicleservice}=require("../Service/vehicleservice");
const createvehiclebusiness=async(payload,query)=>{
    try{
        const { vehicleId } = payload;
        const existingVehicle = await findvehicleservice({ vehicleId});
        if (existingVehicle) {
            console.log("Vehicle already exists");
            return "Vehicle with this number plate already exists";
        }

        const vehiclePayload = {
            ...payload,
            available: true,  
        };

        const result = await createvehicleservice(vehiclePayload);
        console.log("Created vehicle successfully", result);

        return result;
    } catch (error) {
            throw error;
        }
    
};
const getvehiclebusiness = async (vehicleId) => {
  try {
    if (!vehicleId) {
      throw new Error("vehicleId is required");
    }
    const getagent = await findvehicleservice({ vehicleId });
    return getagent || null;
  } catch (error) {
    throw error;
  }
};
const deletevehiclebusiness = async (vehicleId) => {
  try {
    console.log('condition in deletebussiness', vehicleId);
    const condition = { vehicleId: vehicleId };  // <== FIX HERE
    const vehicledetail = await findvehicleservice(condition);
    if (vehicledetail) {
      const deleteagent = await deletevehicleservice(condition);
    }
    return vehicledetail;
  } catch (error) {
    throw error;
  }
}

const putvehiclebusiness = async (query, payload) => {
    try {
        console.log('condition in putbusiness', query, payload);

        const condition = { vehicleId: query.vehicleId };
        const vehicledetail = await findvehicleservice(condition);

        if (!vehicledetail) {
            return null; // Return null if user doesn't exist
        }

        const changeddata = await putvehicleservice( condition,payload);
        return changeddata; // Return the updated data
    } catch (error) {
        throw error;
    }
};

module.exports={createvehiclebusiness,getvehiclebusiness,deletevehiclebusiness,putvehiclebusiness,};