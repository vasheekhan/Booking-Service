const {StatusCodes}=require("http-status-codes")
const {BookingService}=require("../services/index");
const bookingService=new BookingService();
const create=async (req,res)=>{
    try {
        console.log("from controllers",req.body);
      const response=await bookingService.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        message:"Successfully completed booking",
        success:true,
        data:response,
        err:{}
      })  
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message:error.message,
            data:{},
            success:false,
            err:error.explanation

        })
    }
}
const destroy=async (req,res)=>{
  try {
    const response=await bookingService.destroyBooking(req.params.id);
    return res.status(StatusCodes.OK).json({
      message:"Successfully destroyed booking",
      success:true,
      data:response,
      err:{}
    })  
  } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message:error.message,
          data:{},
          success:false,
          err:error.explanation

      })
  }

}
const cancelBooking=async (req,res)=>{
  try {
    const response=await bookingService.cancelBooking(req.params.id);
    return res.status(StatusCodes.OK).json({
      message:"Successfully cancelled booking",
      success:true,
      data:response,
      err:{}
    })  
  } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message:error.message,
          data:{},
          success:false,
          err:error.explanation

      })
  }
  
}


module.exports={
create,
destroy,
cancelBooking
}