const express=require("express");
const { BookingControllers } = require("../../controllers/index");
const router=express.Router();
console.log("hey");
router.post("/bookings",BookingControllers.create);
router.delete("/bookings/:id",BookingControllers.destroy);
router.patch("/bookings/:id",BookingControllers.cancelBooking)
module.exports=router;