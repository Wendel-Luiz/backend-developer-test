import { Kysely } from 'kysely'
import { db } from '../../database/database'
import { DB, Jobs } from '../../database/types'

export class JobRepository {
  private readonly db

  constructor() {
    this.db = db
  }

  create = async (job: Jobs) => {
    return await this.db
      .insertInto('jobs')
      .values({
        title: job.title,
        company_id: job.company_id,
        location: job.location,
        description: job.description,
        notes: job.notes
      })
      .returning('id')
      .executeTakeFirst()
  }

  findById = async (id: string) => {
    return await this.db
      .selectFrom('jobs')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst()
  }

  publish = async (id: string) => {
    return await this.db
      .updateTable('jobs')
      .set({
        status: 'published'
      })
      .where('id', '=', id)
      .returning('id')
      .executeTakeFirst()
  }

  archive = async (id: string) => {
    return await this.db
      .updateTable('jobs')
      .set({
        status: 'archived'
      })
      .where('id', '=', id)
      .returning('id')
      .executeTakeFirst()
  }

  update = async (
    id: string,
    {
      title,
      location,
      description
    }: { title: string; location: string; description: string }
  ) => {
    return await this.db
      .updateTable('jobs')
      .set({
        title,
        location,
        description
      })
      .where('id', '=', id)
      .returning('id')
      .executeTakeFirst()
  }

  delete = async (id: string) => {
    return await this.db
      .deleteFrom('jobs')
      .where('id', '=', id)
      .executeTakeFirst()
  }
}
