import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'

export function paramValidator(paramSchema: ZodSchema) {
  return function ZodValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const parsed = paramSchema.parse(req.params)
    req.params = parsed
    next()
  }
}
