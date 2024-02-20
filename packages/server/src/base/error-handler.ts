import { Request, Response } from 'express'
import { AppError } from './errors'
import { AppResponse } from './response'

export function formatedError(
  req: Request,
  res: Response,
  err: unknown
): Response<AppResponse<string>> {
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({
      status: err.statusCode,
      message: 'An error has occured.',
      error: err.message
    })
  }

  console.error((err as Error).message)

  return res.status(500).send({
    status: 500,
    message: 'An error has occured.',
    error: 'Internal Server Error'
  })
}
