const {StatusCodes}=require("http-status-codes")
class ValidtionError extends Error{
    constructor(error){
        super();
        let explanation=[];
        error.errors.forEach((err)=> {
            explanation.push(err.message);     
            
        });
this.name="validationError";
this.message="Not able to validate the request sent in to the data";
this.explanation=explanation;
this.statusCode=StatusCodes.BAD_REQUEST
    }
}
module.exports=ValidtionError;