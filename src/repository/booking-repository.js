const {StatusCodes}=require("http-status-codes");
const {Booking}=require("../models/index");
const { ValidationError, AppError } = require("../utils/errors/index"); 
class BookingRepository{
async create(data){
    try {
        const booking=await Booking.create(data);
        return booking;
    } catch (error) {
        if(error.name="SequelizeValidationError"){
            throw new ValidationError(error);
        }
        throw new AppError("RepositoryError","cannot create Booking","there was some issi=ue in creating the booking please try again later",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
async update(bookingId,data){
    try {
    const booking=  await Booking.findByPk(bookingId);
    if(data.status){
        booking.status=data.status;
    }
   await booking.save();
   return booking;
      
       return true;
    } catch (error) {
        if(error.name="SequelizeValidationError"){
            throw new ValidationError(error);
        }
        throw new AppError("RepositoryError","cannot update the  Booking","there was some issiue in updating  the booking please try again later",StatusCodes.INTERNAL_SERVER_ERROR)
    }
    }
    async destroy(bookingId){
        try {
            const response=await Booking.destroy({
                where:{
                    id:bookingId
                }
            })
            return true;
        } catch (error) {
            if(error.name="SequelizeValidationError"){
                throw new ValidationError(error);
            }
            throw new AppError("RepositoryError","cannot update the  Booking","there was some issiue in updating  the booking please try again later",StatusCodes.INTERNAL_SERVER_ERROR)  
        }
    }
    async find(bookingId){
    try{    const booking =await Booking.findByPk(bookingId);
        return booking;}catch(error){
            if(error.name="SequelizeValidationError"){
                throw new ValidationError(error);
            }
            throw new AppError("RepositoryError","cannot update the  Booking","there was some issiue in updating  the booking please try again later",StatusCodes.INTERNAL_SERVER_ERROR)  
        }
    }
}



module.exports=BookingRepository;