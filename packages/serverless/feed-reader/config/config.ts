import { z } from 'zod'

class Environment {
  public readonly BUCKET: string
  public readonly S3KEY: string

  constructor() {
    const parsed = envSchema.safeParse(process.env)
    if (!parsed.success) {
      throw new Error(`Error parsing env file: ${parsed.error.toString()}`)
    }

    this.BUCKET = parsed.data.BUCKET
    this.S3KEY = parsed.data.S3KEY
  }
}

const envSchema = z.object({
  BUCKET: z.string(),
  S3KEY: z.string()
})

export const env = new Environment()
