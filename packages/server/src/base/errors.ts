export class AppError extends Error {
  public statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'App Error'
    this.statusCode = statusCode
  }
}

export class BadRequestException extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class NotFoundException extends AppError {
  constructor(message: string) {
    super(message, 404)
  }
}
