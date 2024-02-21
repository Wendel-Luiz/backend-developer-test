import { db } from './database/database'

export class Repository {
  private readonly db

  constructor() {
    this.db = db
  }

  findAllPublished = async () => {
    return await this.db
      .selectFrom('jobs')
      .leftJoin('companies', 'companies.id', 'jobs.company_id')
      .select([
        'jobs.id as id',
        'jobs.title as title',
        'jobs.description as description',
        'companies.name as company_name',
        'jobs.created_at as created_at'
      ])
      .where('jobs.status', '=', 'published')
      .execute()
  }
}
