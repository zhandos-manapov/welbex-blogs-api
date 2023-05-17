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
exports.deletePost = exports.updatePost = exports.createPost = exports.getPosts = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const http_status_codes_1 = require("http-status-codes");
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { user } = res.locals;
    let page = (_a = req.query.page) !== null && _a !== void 0 ? _a : 1;
    page = +page;
    if (isNaN(page))
        throw new Error('Please provide number value as page query parameter');
    const LIMIT = 20;
    const posts = yield post_model_1.default.find({ author: user._id })
        .sort({ createdAt: -1 })
        .limit(LIMIT)
        .skip((+page - 1) * LIMIT);
    const count = yield post_model_1.default.countDocuments();
    res.status(http_status_codes_1.StatusCodes.OK).json({ totalPages: Math.ceil(count / LIMIT), currentPage: page, posts });
});
exports.getPosts = getPosts;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const { user } = res.locals;
    const { message } = req.body;
    const payload_post = {
        author: user._id,
        message: message,
        media: {
            data: (_b = req.file) === null || _b === void 0 ? void 0 : _b.buffer,
            contentType: (_c = req.file) === null || _c === void 0 ? void 0 : _c.mimetype,
        },
    };
    yield post_model_1.default.create(payload_post);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: 'Post created successfully' });
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    const { postId } = req.params;
    const { message } = req.body;
    yield post_model_1.default.findOneAndUpdate({ author: user._id, _id: postId }, { message }, { runValidators: true });
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Post updated successfully' });
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = res.locals;
    const { postId } = req.params;
    yield post_model_1.default.findOneAndDelete({ author: user._id, _id: postId });
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Post deleted successfully' });
});
exports.deletePost = deletePost;
