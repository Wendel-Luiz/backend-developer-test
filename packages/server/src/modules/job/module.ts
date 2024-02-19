import express from 'express'
import { JobController } from './controller'
import { JobService } from './service'

export class JobModule {
  private router
  private controller
  private service

  constructor() {
    this.router = express.Router()
    this.service = new JobService()
    this.controller = new JobController(this.service)
  }

  buildRoutes = () => {
    return this.router.get('/', this.controller.hello)
  }
}
