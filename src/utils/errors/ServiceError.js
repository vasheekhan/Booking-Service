const { StatusCodes } = require("http-status-codes");

class ServiceError extends Error {
    constructor(
        message = "Something went wrong",
        explanation = "Service layer error",
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super(message); // ✅ FIX: must call super
        this.name = "ServiceError";
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

module.exports = { ServiceError }; // ✅ Export as object
