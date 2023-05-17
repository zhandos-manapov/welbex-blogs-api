import 'express-async-errors'
import express, { Express, NextFunction, Request, Response } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db/connection'
import errorHandler from './middleware/error-handler'
import morgan from 'morgan'
import http from 'http'

dotenv.config()

// Routes
import authRouter from './routes/auth.router'
import postRouter from './routes/post.router'
import authorize from './middleware/auth.middleware'
import { NotFoundError } from './errors'

const app: Express = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(morgan('combined'))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/post', authorize, postRouter)

app.use(() => {
  throw new NotFoundError('Route was not found')
})

app.use(errorHandler)

const port = process.env.PORT || 3000

;(async () => {
  try {
    await connectDB(process.env.MONGO_URI!)
    const server = http.createServer(app)
    server.listen(port)
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    // app.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`))
  } catch (err) {
    console.log(err)
  }
})()
