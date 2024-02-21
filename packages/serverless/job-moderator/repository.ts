import { db } from './database/database'

export class Repository {
  private readonly db

  constructor() {
    this.db = db
  }

  findById = async (id: string) => {
    return await this.db
      .selectFrom('jobs')
      .select(['jobs.id', 'jobs.title', 'jobs.description'])
      .where('jobs.id', '=', id)
      .executeTakeFirst()
  }

  publish = async (id: string) => {
    return await this.db
      .updateTable('jobs')
      .set({
        status: 'published'
      })
      .where('jobs.id', '=', id)
      .executeTakeFirst()
  }

  reject = async (id: string, notes: string) => {
    return await this.db
      .updateTable('jobs')
      .set({
        status: 'rejected',
        notes
      })
      .where('jobs.id', '=', id)
      .executeTakeFirst()
  }
}
