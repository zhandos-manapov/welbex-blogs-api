import 'express-async-errors'
import express, { Express } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db/connection'
import errorHandler from './middleware/error-handler'
import morgan from 'morgan'
import { NotFoundError } from './errors'
import indexRouter from './routes/index.route'

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(morgan('combined'))
app.use('/', indexRouter)
app.use(() => { throw new NotFoundError('Route was not found') })
app.use(errorHandler)

const port = process.env.PORT || 3000

;(async () => {
  try {
    await connectDB(process.env.MONGO_URI!)
    app.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`))
  } catch (err) {
    console.log(err)
  }
})()
