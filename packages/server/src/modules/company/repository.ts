import { Kysely } from 'kysely'
import { DB } from '../../database/types'

export class CompanyRepository {
  constructor(private db: Kysely<DB>) {}

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
