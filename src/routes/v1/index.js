const express=require("express");
const { BookingControllers } = require("../../controllers/index");
const router=express.Router();
console.log("hey");
router.post("/bookings",BookingControllers.create);
module.exports=router;