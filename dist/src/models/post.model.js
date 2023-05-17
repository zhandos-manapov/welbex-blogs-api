"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required: [true, 'Post message must be provided'],
    },
    media: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Post', PostSchema);
