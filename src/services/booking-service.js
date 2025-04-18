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
      const flightId = data.flightId;
      let getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/getflight/${flightId}`;
      const flight = await axios.get(getFlightRequestUrl);
    
      const flightData = flight.data.data;
      let priceOfTheFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in booking process ",
          "Insuffficient seats in the fligths"
        );
      }
  
      const totalCost=priceOfTheFlight*data.noOfSeats;
   
      const bookingPayload={...data,totalCost};
      const booking=await this.BookingRepository.create(bookingPayload);
      const updateFlightRequestURL=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
      await axios.patch(updateFlightRequestURL,{totalSeats:flightData.totalSeats-booking.noOfSeats})
     const finalBooking= await this.BookingRepository.update(booking.id,{status:"Booked"})
      return finalBooking;
      
    } catch (error) {
      console.error("Error fetching flight details:", error.message);
      const explanation =
        error.response?.data?.message || "Flight service call failed";

      throw new ServiceError(
        "Unable to create booking",
        explanation,
        error.response?.status || 500
      );
    }
  }
}

module.exports = BookingService;
