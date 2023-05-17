"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.signin = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const auth_utils_1 = require("../utils/auth.utils");
const errors_1 = require("../errors");
const http_status_codes_1 = require("http-status-codes");
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const db_user = yield user_model_1.default.findOne({ email: user.email });
    if (!db_user)
        throw new errors_1.NotFoundError('User email does not exist');
    const valid = db_user.validPassword(user.password);
    if (!valid)
        throw new errors_1.UnauthorizedError('Invalid credentials');
    const token = db_user.issueJWT();
    res.status(http_status_codes_1.StatusCodes.OK).json(token);
});
exports.signin = signin;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = yield user_model_1.default.findOne({ email: req.body.email });
    if (checkUser)
        throw new errors_1.BadRequestError('Email already exists');
    const user = req.body;
    const { salt, hash } = (0, auth_utils_1.genHash)(user.password);
    const payloadUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        salt,
        hash,
    };
    yield user_model_1.default.create(payloadUser);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: 'Successfully registed' });
});
exports.signup = signup;
