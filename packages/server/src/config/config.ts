import * as dotenv from 'dotenv'
import { z } from 'zod'

class Environment {
  public readonly NODE_ENV: string
  public readonly DB_NAME: string
  public readonly DB_HOST: string
  public readonly DB_USER: string
  public readonly DB_PORT: number
  public readonly DB_MAX_CONNECTIONS: number
  public readonly SQS_QUEUE: string

  constructor() {
    const env = dotenv.config()

    if (env.error === null) {
      throw new Error('Error while loading env file')
    }

    const parsed = envSchema.safeParse(env.parsed)
    if (!parsed.success) {
      throw new Error(`Error parsing env file: ${parsed.error.toString()}`)
    }

    this.NODE_ENV = parsed.data.NODE_ENV
    this.DB_NAME = parsed.data.DB_NAME
    this.DB_HOST = parsed.data.DB_HOST
    this.DB_USER = parsed.data.DB_USER
    this.DB_PORT = parsed.data.DB_PORT
    this.DB_MAX_CONNECTIONS = parsed.data.DB_MAX_CONNECTIONS
    this.SQS_QUEUE = parsed.data.SQS_QUEUE
  }
}

const envSchema = z.object({
  NODE_ENV: z.enum(['prod', 'dev', 'test']),
  DB_NAME: z.string(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PORT: z.string().transform((value) => Number(value)),
  DB_MAX_CONNECTIONS: z.string().transform((value) => Number(value)),
  SQS_QUEUE: z.string()
})

export const env = new Environment()
