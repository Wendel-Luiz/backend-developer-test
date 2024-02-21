import { z } from 'zod'

class Environment {
  public readonly NODE_ENV: string
  public readonly DB_NAME: string
  public readonly DB_HOST: string
  public readonly DB_USER: string
  public readonly DB_PASSWORD: string
  public readonly DB_PORT: number
  public readonly DB_MAX_CONNECTIONS: number
  public readonly OPEN_AI_KEY: string

  constructor() {
    const parsed = envSchema.safeParse(process.env)
    if (!parsed.success) {
      throw new Error(`Error parsing env file: ${parsed.error.toString()}`)
    }

    this.NODE_ENV = parsed.data.NODE_ENV
    this.DB_NAME = parsed.data.DB_NAME
    this.DB_HOST = parsed.data.DB_HOST
    this.DB_USER = parsed.data.DB_USER
    this.DB_PASSWORD = parsed.data.DB_PASSWORD
    this.DB_PORT = parsed.data.DB_PORT
    this.DB_MAX_CONNECTIONS = parsed.data.DB_MAX_CONNECTIONS
    this.OPEN_AI_KEY = parsed.data.OPEN_AI_KEY
  }
}

const envSchema = z.object({
  NODE_ENV: z.enum(['prod', 'dev', 'test']),
  DB_NAME: z.string(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string().transform((value) => Number(value)),
  DB_MAX_CONNECTIONS: z.string().transform((value) => Number(value)),
  OPEN_AI_KEY: z.string()
})

export const env = new Environment()
