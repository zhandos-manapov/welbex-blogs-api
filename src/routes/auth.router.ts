import express from 'express'
import { signin, signup } from '../controllers/auth.controller'

const router = express.Router()

router.route('/').post(signin)
// router.route('/signup').post(signup)

export default router