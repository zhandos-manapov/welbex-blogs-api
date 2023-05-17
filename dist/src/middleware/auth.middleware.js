"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authorize(req, res, next) {
    var _a, _b;
    const tokenParts = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : '';
    if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
        try {
            const verification = jsonwebtoken_1.default.verify(tokenParts[1], process.env.PUBLIC_KEY, { algorithms: ['RS256'] });
            res.locals = { user: verification };
            console.log(verification);
            next();
        }
        catch (error) {
            throw new errors_1.UnauthorizedError('Invalid token');
        }
    }
    else {
        throw new errors_1.UnauthorizedError('You are not authorized to visit this route');
    }
}
exports.default = authorize;
