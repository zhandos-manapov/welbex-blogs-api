import { Response, Request } from 'express'
import Post from '../models/post.model'
import { StatusCodes } from 'http-status-codes'

const getPosts = async (req: Request, res: Response) => {
  const { user } = res.locals
  let page = req.query.page ?? 1
  page = +page

  if (isNaN(page)) throw new Error('Please provide number value as page query parameter')

  const LIMIT = 20
  const posts = await Post.find({ author: user._id })
    .sort({ createdAt: -1 })
    .limit(LIMIT)
    .skip((+page - 1) * LIMIT)

  const count = await Post.countDocuments()
  res.status(StatusCodes.OK).json({ totalPages: Math.ceil(count / LIMIT), currentPage: page, posts })
}

const createPost = async (req: Request, res: Response) => {
  const { user } = res.locals
  const { message } = req.body
  const payload_post = {
    author: user._id,
    message: message,
    media: {
      data: req.file?.buffer,
      contentType: req.file?.mimetype,
    },
  }
  await Post.create(payload_post)
  res.status(StatusCodes.CREATED).json({ message: 'Post created successfully' })
}

const updatePost = async (req: Request, res: Response) => {
  const { user } = res.locals
  const { postId } = req.params
  const { message } = req.body
  await Post.findOneAndUpdate({ author: user._id, _id: postId }, { message }, { runValidators: true })
  res.status(StatusCodes.OK).json({ message: 'Post updated successfully' })
}

const deletePost = async (req: Request, res: Response) => {
  const { user } = res.locals
  const { postId } = req.params
  await Post.findOneAndDelete({ author: user._id, _id: postId })
  res.status(StatusCodes.OK).json({ message: 'Post deleted successfully' })
}

export { getPosts, createPost, updatePost, deletePost }
