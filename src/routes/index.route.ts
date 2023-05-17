import express from 'express'

// Routes
import authRouter from './auth.router'
import postRouter from './post.router'

const index = express.Router()

index.use('/api/v1/auth', authRouter)
index.use('/api/v1/post', postRouter)

export default index
