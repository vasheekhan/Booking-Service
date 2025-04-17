const { BookingRepository } = require("../repository/index");
const { FLIGHT_SERVICE_PATH } = require("../config/serverConfig.js");
const { ServiceError } = require("../utils/errors/ServiceError.js");
const axios = require("axios");

class BookingService {
    constructor() {
        this.BookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            console.log("data",data);
            console.log("hey2");
            const flightId = data.flightId;
            console.log(flightId);
            let getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/getflight/${flightId}`;
            console.log(getFlightRequestUrl);

            const flight = await axios.get(getFlightRequestUrl);
            console.log("Booking service", flight);
            return flight.data.data;

        } catch (error) {
            console.error("Error fetching flight details:", error.message);
            
            // Extract explanation from response if available
            const explanation = error.response?.data?.message || "Flight service call failed";

            throw new ServiceError(
                "Unable to create booking",
                explanation,
                error.response?.status || 500
            );
        }
    }
}

module.exports = BookingService;
