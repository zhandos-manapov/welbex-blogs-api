"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Routes
const auth_router_1 = __importDefault(require("./auth.router"));
const post_router_1 = __importDefault(require("./post.router"));
const index = express_1.default.Router();
index.use('/api/v1/auth', auth_router_1.default);
index.use('/api/v1/post', post_router_1.default);
exports.default = index;
