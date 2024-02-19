import { Request, Response } from 'express'
import { formatedError } from '../../base/error-handler'
import { formatedResponse } from '../../base/response'
import { JobService } from './service'

export class JobController {
  constructor(private service: JobService) {}

  hello = async (req: Request, res: Response) => {
    try {
      return formatedResponse(req, res, await this.service.hello())
    } catch (err) {
      return formatedError(req, res, err)
    }
  }
}
