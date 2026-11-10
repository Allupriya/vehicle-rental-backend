
const { bookingSchema } = require("../../schema/users");
const dbConnect = require("../../utils/connectionSetup");

const createbookingservice = async (data, dbURL = "RENT-V") => {
    try {
        const conn = await dbConnect(dbURL);

        const booking = await conn
            .model("Booking", bookingSchema, "Booking")
            .create(data);

        return booking;
    } catch (error) {
        throw error;
    }
};

const findbookingservice = async (condition, dbURL = "RENT-V") => {
    try {
        const conn = await dbConnect(dbURL);

        const booking = await conn
            .model("Booking", bookingSchema, "Booking")
            .findOne(condition);

        return booking;
    } catch (error) {
        throw error;
    }
};
const getuserbookingservice = async (userId, dbURL = "RENT-V") => {
  const conn = await dbConnect(dbURL);

  return conn
    .model("Booking", bookingSchema, "Booking")
    .find({ userId })
    .sort({ createdAt: -1 });
};

module.exports = {
    createbookingservice,
    findbookingservice,
    getuserbookingservice
};