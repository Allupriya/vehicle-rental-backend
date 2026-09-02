const {createuserbusiness,getuserbussiness,
    deleteuserbusiness,putuserbusiness}=require("../Business/UserBusiness");
const {userloginbusiness}=require("../Business/loginbusiness")
const Logger = require("../../utils/logger");
const {METHODS}=require("../../utils/constants");
const createusercontroller=async (req,res)=>{
     const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.CONTROLLER_METHOD} || ${METHODS.MODULES.USER.GET_USER}`
  );
  logger.debug(` req.body || ${req.body}`);
  try{
        const resp=await createuserbusiness(req.body,req.query);
        console.log('completed the controller ',resp);
        return res.status(200).json({
            message: resp
          });
    }catch (error) {
        throw error;
    }
}

const getusercontroller=async (req,res)=>{
    const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.CONTROLLER_METHOD} || ${METHODS.MODULES.USER.GET_USER}`
  );
  logger.debug(
    ` body || ${JSON.stringify(req.body)} || query || ${JSON.stringify(
      req.query
    )}`
  );
    try{
        const resp=await getuserbussiness(req.query);
        return res.status(200).json({
            message:resp
        });
    }catch(error){
        throw error;
    }
}

const deleteusercontroller=async(req,res)=>{
  const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.CONTROLLER_METHOD} || ${METHODS.MODULES.USER.DELETE_USER}`
  );
  logger.debug(
    ` body || ${JSON.stringify(req.body)} || query || ${JSON.stringify(
      req.query
    )}`
  );
try{
    const resp=await deleteuserbusiness(req.query);
        return res.status(200).json({
            message:resp
        });
    }catch(error){
        throw error;
    }
}
const putusercontroller=async(req,res)=>{
      const logger = new Logger(
    `${METHODS.ENTERING_TO}|| ${METHODS.CONTROLLER_METHOD} || ${METHODS.MODULES.USER.UPDATE_USER}`
  );
  logger.debug(
    ` body || ${JSON.stringify(req.body)} || query || ${JSON.stringify(
      req.query
    )}`
  );
try{
    const resp=await putuserbusiness(req.query,req.body);
        return res.status(200).json({
            message:resp
        });
    }catch(error){
        throw error;
    }
}

const userlogincontroller=async(req,res)=>{
  //   const logger = new Logger(
  //   `${METHODS.ENTERING_TO}|| ${METHODS.CONTROLLER_METHOD} || ${METHODS.MODULES.USER.UPDATE_USER}`
  // );
  // logger.debug(
  //   ` body || ${JSON.stringify(req.body)} || query || ${JSON.stringify(
  //     req.query
  //   )}`
  // );
  try{
    const resp=await userloginbusiness(req.body);
    return res.status(200).json({
        message:resp
    })
  }catch(error){
    throw error;
  }
}
module.exports={createusercontroller,getusercontroller,
    deleteusercontroller,putusercontroller,userlogincontroller}