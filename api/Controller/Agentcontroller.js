 const {createagentbusiness,getagentbusiness,deleteagentbusiness,
    putagentbusiness,loginagentbusiness }=require("../Business/AgentBusiness");

const sendResponse=require("../../utils/response");
const createagentcontroller=async (req,res)=>{
    try{
        console.log('entered into controller ');
        const resp=await createagentbusiness(req.body,req.query);
        console.log('completed the controller ',resp);
        return sendResponse(res, 200, true, 'Agent created successfully', resp);
    }catch(error){
        console.error('Error in create agent controller:', error);
        return sendResponse(res, 500, false, 'Failed to create agent', error.message);
    }
}
const getagentcontroller = async (req, res) => {
    try {
        console.log('Entered into controller to get agent details');
        const { username } = req.query;  // Extract username from query
        if (!username) {
             return sendResponse(res, 400, false, 'Username is required');
        }

        const resp = await getagentbusiness(username);  // Fetch agent details using username only
        if (!resp) {
            return sendResponse(res, 404, false, 'Agent not found');
        }

        console.log('Completed the get agent controller', resp);
        return sendResponse(res, 200, true, 'Agent details fetched successfully', resp);
    }catch (error) {
        console.error('Error in get agent controller:', error);
        return sendResponse(res, 500, false, 'Error fetching agent details', error.message);
    }
}
const deleteagentcontroller=async(req,res)=>{
    try{
        console.log('entered in to controller to delete agent');
        const { username } = req.query;  // Extract username from query
        if (!username) {
             return sendResponse( res, 400, false, 'Username is required');
        }
        const resp=await deleteagentbusiness(username);
        if (!resp) {
            return sendResponse(res, 404, false, 'Agent not found');
        }
        console.log('Completed the delete agent controller', resp);
        return sendResponse(res, 200, true, 'Agent details deleted successfully', resp);
    }catch (error) {
        console.error('Error in delete agent controller:', error);
        return sendResponse(res, 500, false, 'Error deleting  agent details', error.message);
    }
}
const putagentcontroller=async(req,res)=>{
try{
    console.log("putagentbusiness is:", putagentbusiness);
    const resp=await putagentbusiness(req.query,req.body);
        return res.status(200).json({
            message:resp
        });
    }catch(error){
        throw error;
    }
}
const loginagentcontroller=async(req,res)=>{
    try {
    const { email, password } = req.body;
    const response = await loginagentbusiness({ email, password });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports={createagentcontroller,getagentcontroller,deleteagentcontroller,putagentcontroller,loginagentcontroller} 