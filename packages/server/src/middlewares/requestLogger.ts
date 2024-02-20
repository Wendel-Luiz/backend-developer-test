import { NextFunction, Request, Response } from 'express'
import logger from '../config/logger'

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info(`Incoming request for: ${req.path}`)
  next()
}
