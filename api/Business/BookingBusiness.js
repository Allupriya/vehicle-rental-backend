
const {
    createbookingservice
} = require("../Service/Bookingservice");

const {
    findvehicleservice
} = require("../Service/vehicleservice");
const{
    getuserbookingservice
}=require("../Service/Bookingservice");

const createbookingbusiness = async (payload, user) => {
    try {
        const { vehicleId, pickupDate, returnDate } = payload;

        // 1. Validate the booking dates
        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);

        if (
            !vehicleId ||
            !pickupDate ||
            !returnDate ||
            isNaN(pickup.getTime()) ||
            isNaN(returnD.getTime()) ||
            pickup >= returnD ||
            pickup < new Date()
        ) {
            throw new Error("Invalid vehicle or booking dates");
        }

        // 2. Check whether the vehicle exists
        const vehicle = await findvehicleservice({ vehicleId });

        if (!vehicle) {
            throw new Error("Vehicle not found");
        }

        // 3. Check whether the vehicle is available
        if (vehicle.available !== true) {
            throw new Error("Vehicle is not available");
        }

        // 4. Calculate the rental amount
        const days = Math.ceil(
            (returnD - pickup) / (1000 * 60 * 60 * 24)
        );

        const totalAmount = days * vehicle.rentPerDay;

        // 5. Prepare the booking details
        const bookingPayload = {
            userId: user._id,
            vehicleId,
            pickupDate: pickup,
            returnDate: returnD,
            totalAmount,
            status: "Confirmed"
        };

        // 6. Save the booking
        const booking = await createbookingservice(bookingPayload);

        return booking;

    } catch (error) {
        throw error;
    }
};
const getuserbookingsbusiness = async (user) => {
  const bookings = await getuserbookingservice(user._id);
  return bookings;
};

module.exports = {
    createbookingbusiness, getuserbookingsbusiness
};