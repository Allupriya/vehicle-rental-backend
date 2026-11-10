
const {
    createbookingbusiness,getuserbookingsbusiness
} = require("../Business/BookingBusiness");

const createbookingcontroller = async (req, res) => {
    try {
        const user = req.user;

        const booking = await createbookingbusiness(
            req.body,
            user
        );

        return res.status(201).json({
            message: "Booking created successfully",
            data: booking
        });

    } catch (error) {
        console.error("Booking controller error:", error.message);

        return res.status(400).json({
            message: error.message
        });
    }
};
const getuserbookingscontroller = async (req, res) => {
  try {
    const user = req.user;
    const bookings = await getuserbookingsbusiness(user);

    return res.status(200).json({
      message: "Bookings retrieved successfully",
      data: bookings
    });
  } catch (error) {
    console.error("Get bookings error:", error.message);
    return res.status(500).json({
      message: "Failed to retrieve bookings"
    });
  }
};

module.exports = {
    createbookingcontroller, getuserbookingscontroller
};
console.log("Booking exports:", Object.keys(module.exports));