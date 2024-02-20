import { Request, Response } from 'express'
import { formatedError } from '../../base/error-handler'
import { formatedResponse } from '../../base/response'
import { JobService } from './service'

export class JobController {
  constructor(private service: JobService) {}

  create = async (req: Request, res: Response) => {
    try {
      return formatedResponse(req, res, await this.service.create(req.body))
    } catch (err) {
      return formatedError(req, res, err)
    }
  }

  publish = async (req: Request, res: Response) => {
    try {
      return formatedResponse(
        req,
        res,
        await this.service.publish(req.params.job_id)
      )
    } catch (err) {
      return formatedError(req, res, err)
    }
  }

  archive = async (req: Request, res: Response) => {
    try {
      return formatedResponse(
        req,
        res,
        await this.service.archive(req.params.job_id)
      )
    } catch (err) {
      return formatedError(req, res, err)
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      return formatedResponse(
        req,
        res,
        await this.service.update(req.params.job_id, req.body)
      )
    } catch (err) {
      return formatedError(req, res, err)
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      return formatedResponse(
        req,
        res,
        await this.service.delete(req.params.job_id)
      )
    } catch (err) {
      return formatedError(req, res, err)
    }
  }
}
