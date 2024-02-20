import express from 'express'
import { paramValidator } from '../../middlewares/paramValidator'
import { CompanyController } from './controller'
import { CompanyRepository } from './repository'
import { findByIdCompanyParamSchema } from './schemas'
import { CompanyService } from './service'

export class CompanyModule {
  private router
  private controller
  private service
  private repository

  constructor() {
    this.router = express.Router()
    this.repository = new CompanyRepository()
    this.service = new CompanyService(this.repository)
    this.controller = new CompanyController(this.service)
  }

  buildRoutes = () => {
    this.router.get('/', this.controller.findAll)

    this.router.get(
      '/:id',
      paramValidator(findByIdCompanyParamSchema),
      this.controller.findById
    )

    return this.router
  }
}
