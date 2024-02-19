import express from 'express'
import { JobModule } from './modules/job/module'

class Server {
  private app
  private jobModule

  constructor() {
    this.app = express()
    this.jobModule = new JobModule()

    this.configure()
    this.serve()
  }

  private configure = async () => {
    this.app.use('/job', this.jobModule.buildRoutes())
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
