import { NotFoundException } from '../../core/errors'
import { CompanyRepository } from './repository'

export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  findAll = async () => {
    return this.companyRepository.findAll()
  }

  findById = async (id: string) => {
    const company = await this.companyRepository.findById(id)

    if (!company) {
      throw new NotFoundException('Company not found.')
    }

    return company
  }
}
