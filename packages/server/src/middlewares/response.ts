import { Request, Response } from 'express'

export function responseMiddleware(req: Request, res: Response) {
  return res.status(200).json({
    status: 200,
    message: 'Success',
    data: res.locals
  })
}
