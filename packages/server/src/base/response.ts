import { Request, Response } from 'express'

export interface AppResponse<T> {
  statusCode: number
  message: string
  error?: string
  data?: T
}

export function formatedResponse<T>(
  req: Request,
  res: Response,
  data?: T
): Response<AppResponse<T>> {
  return res.status(200).send({
    status: 200,
    message: 'Success',
    data
  })
}
