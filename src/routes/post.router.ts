import express from 'express'
import { createPost, getPosts, updatePost } from '../controllers/post.controller'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = express.Router()

router.route('/').get(getPosts).post(upload.single('file'), createPost)
router.route('/:postId').patch(updatePost)

export default router
