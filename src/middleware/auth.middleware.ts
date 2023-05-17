import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../errors'
import jwt from 'jsonwebtoken'

export default function authorize(req: Request, res: Response, next: NextFunction) {
  const tokenParts = req.headers.authorization?.split(' ') ?? ''
  if (tokenParts[0] === 'Bearer' && tokenParts[1].match(/\S+\.\S+\.\S+/) !== null) {
    try {
      const verification = jwt.verify(tokenParts[1], process.env.PUBLIC_KEY as string, { algorithms: ['RS256'] })
      res.locals.user = verification
      console.log(verification)
      next()
    } catch (error) {
      throw new UnauthorizedError('Invalid token')
    }
  } else {
    throw new UnauthorizedError('You are not authorized to visit this route')
  }
}
