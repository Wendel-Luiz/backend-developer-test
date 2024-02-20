import { NextFunction, Request, Response } from 'express'

import { JobService } from './service'
import { CreateJobBody } from './shemas'

export class JobController {
  constructor(private service: JobService) {}

  create = async (
    req: Request<CreateJobBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      res.locals = await this.service.create(req.body)
      next()
    } catch (err) {
      next(err)
    }
  }

  publish = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals = await this.service.publish(req.params.job_id)
      next()
    } catch (err) {
      next(err)
    }
  }

  archive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals = await this.service.archive(req.params.job_id)
      next()
    } catch (err) {
      next(err)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals = await this.service.update(req.params.job_id, req.body)
      next()
    } catch (err) {
      next(err)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals = await this.service.delete(req.params.job_id)
      next()
    } catch (err) {
      next(err)
    }
  }
}
