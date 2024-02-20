import { Request, Response } from 'express'
import { formatedError } from '../../base/error-handler'
import { formatedResponse } from '../../base/response'
import { CompanyService } from './service'

export class CompanyController {
  constructor(private service: CompanyService) {}

  findAll = async (req: Request, res: Response) => {
    try {
      return formatedResponse(req, res, await this.service.findAll())
    } catch (err) {
      return formatedError(req, res, err)
    }
  }

  findById = async (req: Request, res: Response) => {
    try {
      return formatedResponse(
        req,
        res,
        await this.service.findById(req.params.id)
      )
    } catch (err) {
      return formatedError(req, res, err)
    }
  }
}
