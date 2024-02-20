import { z } from 'zod'

export const findByIdCompanyParamSchema = z.object({
  id: z.string().uuid()
})
export type FindByIdCompanyParam = z.infer<typeof findByIdCompanyParamSchema>
