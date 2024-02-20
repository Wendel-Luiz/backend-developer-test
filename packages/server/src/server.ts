import cors from 'cors'
import express from 'express'
import { CompanyModule } from './modules/company/module'
import { JobModule } from './modules/job/module'

class Server {
  private app
  private jobModule
  private companyModule

  constructor() {
    this.app = express()
    this.jobModule = new JobModule()
    this.companyModule = new CompanyModule()

    this.configure()
    this.serve()
  }

  private configure = async () => {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    this.app.use('/job', this.jobModule.buildRoutes())
    this.app.use('/companies', this.companyModule.buildRoutes())
  }

  private serve = async () => {
    this.app.listen(8080, () => console.log('Server listening...'))
  }
}

try {
  new Server()
} catch (err) {
  console.log('Error running the server', err)
}
