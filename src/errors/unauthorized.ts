import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-error'

export default class UnauthorizedError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED)
  }
}
