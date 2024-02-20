import { db } from '../../database/database'

export class CompanyRepository {
  private readonly db

  constructor() {
    this.db = db
  }

  findAll = async () => {
    return await this.db.selectFrom('companies').selectAll().execute()
  }

  findById = async (id: string) => {
    return await this.db
      .selectFrom('companies')
      .selectAll()
      .where('companies.id', '=', id)
      .executeTakeFirst()
  }
}
