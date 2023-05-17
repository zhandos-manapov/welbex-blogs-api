import User from '../models/user.model'
import { Request, Response } from 'express'
import { genHash } from '../utils/auth.utils'
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors'
import { StatusCodes } from 'http-status-codes'

const signin = async (req: Request, res: Response) => {
  const user = req.body
  const db_user = await User.findOne({ email: user.email })

  if (!db_user) throw new NotFoundError('User email does not exist')

  const valid = db_user.validPassword(user.password)

  if (!valid) throw new UnauthorizedError('Invalid credentials')

  const token = db_user.issueJWT()
  return res.status(StatusCodes.OK).json(token)
}

const signup = async (req: Request, res: Response) => {
  const checkUser = await User.findOne({ email: req.body.email })

  if (checkUser) throw new BadRequestError('Email already exists')

  const user = req.body
  const { salt, hash } = genHash(user.password)

  const payloadUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    salt,
    hash,
  }

  await User.create(payloadUser)
  return res.status(StatusCodes.CREATED).json({ message: 'Successfully registed' })
}

export { signup, signin }
