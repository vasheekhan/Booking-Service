const express=require("express");
const { BookingControllers } = require("../../controllers/index");
const router=express.Router();
const bookingControllers=new BookingControllers();


router.post("/bookings",bookingControllers.create);
router.post("/publish",bookingControllers.sendMessageToQueue);
router.delete("/bookings/:id",bookingControllers.destroy);
router.patch("/bookings/:id",bookingControllers.cancelBooking)
module.exports=router;