import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-error'

export default class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST)
  }
}
