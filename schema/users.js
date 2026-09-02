    const mongoose=require("mongoose");
    const Schema=mongoose.Schema;

    const agentSchema=new Schema(
        {
            username:String,
            email:String,
            password: String,
            phoneNumber: String,
            agencyName: String,
            address: String,
            licenseNumber: String
        }
    ,{
        timestamps:true,
    }
    );
  const userSchema = new Schema({
    username: String,
    email: String,
    firstname: String,
    lastname: String,
    password: String,
    phoneNumber: String,
    address: String,
    licenseNumber: String,
    aadharNumber: String
}, {
    timestamps: true
});

   const vehicleSchema = new Schema(
    {
        vehicleId: { type: String, required: true, unique: true },
        name: String,
        type: String,
        model: String,
        numberPlate: String,
        available: Boolean,
        location: String,
        rentPerDay: Number,
    },
    {
        timestamps: true
    }
    )

    module.exports={agentSchema,userSchema,vehicleSchema};