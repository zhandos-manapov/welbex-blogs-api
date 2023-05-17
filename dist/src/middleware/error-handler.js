"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
function errorHandler(err, req, res, next) {
    console.log(err);
    if (err instanceof errors_1.CustomAPIError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    const errorObject = { message: err.message ? err.message : 'Something went wrong!' };
    if (Object.keys(err).length > 0)
        errorObject.err = err;
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(errorObject);
}
exports.default = errorHandler;
