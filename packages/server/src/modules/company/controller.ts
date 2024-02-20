import { NextFunction, Request, Response } from 'express'
import { CompanyService } from './service'

export class CompanyController {
  constructor(private service: CompanyService) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals = await this.service.findAll()
      next()
    } catch (err) {
      next(err)
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals = await this.service.findById(req.params.id)
      next()
    } catch (err) {
      next(err)
    }
  }
}
