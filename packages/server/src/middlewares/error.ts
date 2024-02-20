import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { AppError } from '../core/errors'

export function appErrorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: 'An error has occured.',
      error: err.message
    })
  }

  if (err instanceof z.ZodError) {
    return res.status(400).json({
      status: 500,
      message: 'An validation has occured.',
      errors: err.errors.map((error) => ({
        [error.path.join('/')]: error.message
      }))
    })
  }

  console.error((err as Error).message)

  return res.status(500).json({
    status: 500,
    message: 'An error has occured.',
    error: 'Internal Server Error'
  })
}
