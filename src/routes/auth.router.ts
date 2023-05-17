import express from 'express'
import { signin, signup } from '../controllers/auth.controller'

const router = express.Router()

router.post('/signin', signin)
router.post('signup', signup)

export default router
