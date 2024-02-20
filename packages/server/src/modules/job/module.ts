import express from 'express'
import { bodyValidator } from '../../middlewares/bodyValidator'
import { paramValidator } from '../../middlewares/paramValidator'
import { CompanyRepository } from '../company/repository'
import { JobController } from './controller'
import { JobRepository } from './repository'
import { JobService } from './service'
import {
  archiveJobParamSchema,
  createJobSchema,
  deleteJobParamSchema,
  publishJobParamSchema,
  updateJobBodySchema,
  updateJobParamSchema
} from './shemas'

export class JobModule {
  private router
  private controller
  private service
  private repository

  private companyRepository

  constructor() {
    this.router = express.Router()
    this.repository = new JobRepository()
    this.companyRepository = new CompanyRepository()
    this.service = new JobService(this.repository, this.companyRepository)
    this.controller = new JobController(this.service)
  }

  buildRoutes = () => {
    this.router.post(
      '/',
      bodyValidator(createJobSchema),
      this.controller.create
    )

    this.router.put(
      '/:job_id/publish',
      paramValidator(publishJobParamSchema),
      this.controller.publish
    )

    this.router.put(
      '/:job_id/archive',
      paramValidator(archiveJobParamSchema),
      this.controller.archive
    )

    this.router.put(
      '/:job_id',
      bodyValidator(updateJobBodySchema),
      paramValidator(updateJobParamSchema),
      this.controller.update
    )

    this.router.delete(
      '/:job_id',
      paramValidator(deleteJobParamSchema),
      this.controller.delete
    )

    return this.router
  }
}
