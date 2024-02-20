import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'

export function bodyValidator(bodySchema: ZodSchema) {
  return function ZodValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const parsed = bodySchema.parse(req.body)
    req.body = parsed
    next()
  }
}
