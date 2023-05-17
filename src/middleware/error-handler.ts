import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CustomAPIError } from '../errors'

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log(err)
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message })
  }
  const errorObject: { [key: string]: any } = { message: err.message ? err.message : 'Something went wrong!' }
  if (Object.keys(err).length > 0) errorObject.err = err
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObject)
}
