const {StatusCodes}=require("http-status-codes")
const {BookingService}=require("../services/index");
const { createChannel,publishMessage } = require("../utils/messageQueue");
const {REMINDER_BINDING_KEY}=require("../config/serverConfig");
const bookingService=new BookingService();
class BookingController{
  async sendMessageToQueue(req,res){
    const channel=await createChannel();
    const data={message:"Success",service:"DEMO_SERVICE"};
    publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data));
    return res.status(200).json({
      message:"Successfully published the event"
    })
  }
 async create (req,res){
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
async destroy (req,res){
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
async cancelBooking(req,res){
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
}



// const create=async (req,res)=>{
//     try {
//         console.log("from controllers",req.body);
//       const response=await bookingService.createBooking(req.body);
//       return res.status(StatusCodes.OK).json({
//         message:"Successfully completed booking",
//         success:true,
//         data:response,
//         err:{}
//       })  
//     } catch (error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             message:error.message,
//             data:{},
//             success:false,
//             err:error.explanation

//         })
//     }
// }
// const destroy=async (req,res)=>{
//   try {
//     const response=await bookingService.destroyBooking(req.params.id);
//     return res.status(StatusCodes.OK).json({
//       message:"Successfully destroyed booking",
//       success:true,
//       data:response,
//       err:{}
//     })  
//   } catch (error) {
//       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//           message:error.message,
//           data:{},
//           success:false,
//           err:error.explanation

//       })
//   }

// }
// const cancelBooking=async (req,res)=>{
//   try {
//     const response=await bookingService.cancelBooking(req.params.id);
//     return res.status(StatusCodes.OK).json({
//       message:"Successfully cancelled booking",
//       success:true,
//       data:response,
//       err:{}
//     })  
//   } catch (error) {
//       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//           message:error.message,
//           data:{},
//           success:false,
//           err:error.explanation

//       })
//   }
  
// }


module.exports=BookingController;