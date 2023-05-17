"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide first name'],
        minlength: 2,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: [true, 'Please provide last name'],
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email',
        ],
        unique: true,
    },
    salt: {
        type: String,
        required: [true, 'Please provide salt'],
    },
    hash: {
        type: String,
        required: [true, 'Please provide hash'],
    },
});
UserSchema.methods.issueJWT = function () {
    const payload = {
        sub: this.email,
        iat: Date.now(),
        firstName: this.firstName,
        lastName: this.lastName,
        _id: this._id,
    };
    const signedJWT = jsonwebtoken_1.default.sign(payload, process.env.PRIVATE_KEY, { expiresIn: '7d', algorithm: 'RS256' });
    return {
        token: 'Bearer ' + signedJWT,
        expiresIn: '7d',
    };
};
UserSchema.methods.validPassword = function (password) {
    var hashVerify = crypto_1.default.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
    return this.hash === hashVerify;
};
exports.default = mongoose_1.default.model('User', UserSchema);
