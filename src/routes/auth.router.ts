import express from 'express'
import { signin } from '../controllers/auth.controller'
const router = express.Router({
  strict: true,
})

router.post('/signin', signin)
// router.route('/signup').post(signup)

export default router
