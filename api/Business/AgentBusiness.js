const {createagentservice,
    findagentservice,deleteagentservice,putagentservice,
}=require("../Service/Agentservice");
const { generateemailtoken } = require("../Business/emailtokenBusiness");
const jwt = require("jsonwebtoken");


const createagentbusiness=async (payload,query)=>{
    try{
        console.log('entere into business ')
        let { username, password, email } = payload;
    const dbpayload = {
      ...payload,
      role:"Agent"
    };
    console.log(`dbPayload || ${JSON.stringify(dbpayload)}`);
    const getagent = await findagentservice({
      username
    });
    console.log('create bussiness getagent',getagent)
    if (getagent) {
      console.log('in th get provider....');
      return getagent.username === username
          ? "Username already exists"
          : "Email already exists"
    }
    const userDetails = await createagentservice(dbpayload);
    console.log('completed create bussiness',userDetails);
    await generateemailtoken(email)
    return {
      message: "Agent created successfully. Please verify your email.",
      agent: userDetails,
    };
    }catch(error){
        throw error;
    }
}
const getagentbusiness = async (username) => {
  try {
    if (!username) {
      throw new Error("Username is required");
    }
    const getagent = await findagentservice({ username });
    return getagent || null;
  } catch (error) {
    throw error;
  }
};
const deleteagentbusiness=async(username)=>{
  try {
    console.log('condition in deletebussiness',username);
    const agentdetail=await findagentservice({username});
    if(agentdetail){
      const deleteagent=await deleteagentservice({username});
    }
    return agentdetail;
    }catch(error){
        throw error;
    }

}
const putagentbusiness = async (query, payload) => {
    try {
        console.log('condition in putbusiness', query, payload);

        const userdetail = await findagentservice(query);
        if (!userdetail) {
            return null; // Return null if user doesn't exist
        }

        const changeddata = await putagentservice(query, payload);
        return changeddata; // Return the updated data
    } catch (error) {
        throw error;
    }
};
const loginagentbusiness = async (payload) => {
  try {
    const { email, password } = payload;

    // Find agent by email
    const agent = await findagentservice({ email });
    if (!agent) {
      throw new Error("Agent not found");
    }

    // Compare password
    if (agent.password !== password) {
      throw new Error("Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: agent._id, email: agent.email },
      "secret_key", // replace with process.env.JWT_SECRET in real apps
      { expiresIn: "1h" }
    );

    return {
      message: "Login successful",
      token,
      agent: {
        id: agent._id,
        username: agent.username,
        email: agent.email,
      },
    };
  } catch (error) {
    throw error;
  }
};


module.exports={createagentbusiness,getagentbusiness,deleteagentbusiness,putagentbusiness,loginagentbusiness};