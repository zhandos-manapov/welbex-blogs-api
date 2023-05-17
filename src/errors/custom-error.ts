export default class CustomAPIError extends Error {
  constructor(message: string, public readonly statusCode: number) {
    super(message)
  }
}
