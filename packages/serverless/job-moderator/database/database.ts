import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { env } from '../config/config'
import { DB } from './types' // this is the Database interface we defined earlier

const dialect = new PostgresDialect({
  pool: new Pool({
    database: env.DB_NAME,
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    max: env.DB_MAX_CONNECTIONS
  })
})

export const db = new Kysely<DB>({
  dialect
})
