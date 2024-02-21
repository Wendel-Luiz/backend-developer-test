import { SQS } from '@aws-sdk/client-sqs'
import { env } from '../../config/config'
import {
  BadRequestException,
  InternalServerError,
  NotFoundException
} from '../../core/errors'
import { CompanyRepository } from '../company/repository'
import { JobRepository } from './repository'
import { CreateJobBody } from './shemas'

export class JobService {
  constructor(
    private jobRepository: JobRepository,
    private companyRepository: CompanyRepository
  ) {}

  create = async (job: CreateJobBody) => {
    const company = await this.companyRepository.findById(job.company_id)

    if (!company) {
      throw new NotFoundException(`Company of id ${job.company_id} not found.`)
    }

    const result = await this.jobRepository.create(job)

    if (!result?.id) {
      throw new InternalServerError('Error creating a job.')
    }

    return {
      id: result.id
    }
  }

  publish = async (id: string) => {
    const sqs = new SQS()
    const job = await this.jobRepository.findById(id)

    if (!job) {
      throw new NotFoundException(`Job of id ${id} not found.`)
    }

    const result = await sqs.sendMessage({
      QueueUrl: env.SQS_QUEUE,
      MessageBody: JSON.stringify(id)
    })

    if (!result) {
      throw new InternalServerError(`Error publishing job ${id}`)
    }

    return {
      id
    }
  }

  archive = async (id: string) => {
    const job = await this.jobRepository.findById(id)

    if (!job) {
      throw new NotFoundException(`Job of id ${id} not found.`)
    }

    const result = await this.jobRepository.archive(id)

    if (!result?.id) {
      throw new InternalServerError('Error archiving a job.')
    }

    return {
      id: result.id
    }
  }

  update = async (
    id: string,
    {
      title,
      location,
      description
    }: { title: string; location: string; description: string }
  ) => {
    const jobEntity = await this.jobRepository.findById(id)

    if (!jobEntity) {
      throw new NotFoundException(`Job of id ${id} not found.`)
    }

    const result = await this.jobRepository.update(id, {
      title,
      location,
      description
    })

    if (!result?.id) {
      throw new InternalServerError('Error updating the job.')
    }

    return {
      id: result.id
    }
  }

  delete = async (id: string) => {
    const jobEntity = await this.jobRepository.findById(id)

    if (!jobEntity) {
      throw new NotFoundException(`Job of id ${id} not found.`)
    }

    if (jobEntity.status !== 'draft') {
      throw new BadRequestException("Can't delete a job that isn't a draft.")
    }

    await this.jobRepository.delete(id)

    return {
      id
    }
  }
}
