import express from 'express'
import { db } from '../../database/database'
import { CompanyRepository } from '../company/repository'
import { JobController } from './controller'
import { JobRepository } from './repository'
import { JobService } from './service'

export class JobModule {
  private router
  private controller
  private service
  private repository

  private companyRepository

  constructor() {
    this.router = express.Router()
    this.repository = new JobRepository(db)
    this.companyRepository = new CompanyRepository(db)
    this.service = new JobService(this.repository, this.companyRepository)
    this.controller = new JobController(this.service)
  }

  buildRoutes = () => {
    this.router.post('/', this.controller.create)
    this.router.put('/:job_id/publish', this.controller.publish)
    this.router.put('/:job_id/archive', this.controller.archive)
    this.router.put('/:job_id', this.controller.update)
    this.router.delete('/:job_id', this.controller.delete)

    return this.router
  }
}
