import type { ColumnType } from 'kysely'

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>

export type JobStatus = 'archived' | 'draft' | 'published' | 'rejected'

export type Timestamp = ColumnType<Date, Date | string, Date | string>

export interface Companies {
  created_at: Generated<Timestamp>
  id: Generated<string>
  name: string
  updated_at: Generated<Timestamp>
}

export interface Jobs {
  company_id: string
  created_at: Generated<Timestamp>
  description: string
  id: Generated<string>
  location: string
  notes: string | null
  status: Generated<JobStatus>
  title: string
  updated_at: Generated<Timestamp>
}

export interface DB {
  companies: Companies
  jobs: Jobs
}
