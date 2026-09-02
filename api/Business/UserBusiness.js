    const {createuserservice,finduserservice,
        deleteuserservice,putuserservice}=require("../Service/Userservice");


    const createuserbusiness=async (payload,query)=>{
        try{
            console.log('entere into business ')
            let { username, password, email } = payload;
        const dbpayload = {
        ...payload,
        role:"User"
        };
        console.log(`dbPayload || ${JSON.stringify(dbpayload)}`);
        const getuser = await finduserservice({
        username
        });
        console.log('create bussiness getuser',getuser)
        console.log('create bussiness dbpayload',dbpayload)
        if (getuser) {
        console.log('in th get provider....');
        return getuser.username === username
            ? "Username already exists"
            : "Email already exists"
        }
        const userDetails = await createuserservice(dbpayload);
        console.log('completed create bussiness',userDetails);
        return userDetails;
        }catch(error){
            throw error;
        }
    }
const getuserbussiness=async(payload,query)=>{
    try{
        let {username}=payload;
        console.log('condition in getbussiness',username,payload);
        const userdetail=await finduserservice({username});
        return userdetail;
    }catch(error){
        throw error;
    }
} 
const deleteuserbusiness=async(payload,query)=>{
    try{
        let {username}=payload;
        console.log('condition in deletebussiness',username,payload);
        const userdetail=await finduserservice({username});
        if (userdetail){
            const deleteuser=await deleteuserservice({username});
        }
        return userdetail;
    }catch(error){
        throw error;
    }
}
const putuserbusiness=async(query,payload)=>{
    try{
        console.log('condition in putbussiness',query,payload);
        const userdetail=await finduserservice(query);
        if (userdetail){
           const changeddata=await putuserservice(query,payload);
        }
        return userdetail;
    }catch(error){
        throw error;
    }
}
module.exports={createuserbusiness,getuserbussiness,
    deleteuserbusiness,putuserbusiness};