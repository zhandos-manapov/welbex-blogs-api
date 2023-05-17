import express from 'express'
import { signin, signup } from '../controllers/auth.controller'

const router = express.Router()

router.post('/signin', signin)
// router.route('/signup').post(signup)

export default router