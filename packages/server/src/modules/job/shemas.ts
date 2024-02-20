import { z } from 'zod'

export const createJobSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  notes: z.string(),
  company_id: z.string()
})
export type CreateJobBody = z.infer<typeof createJobSchema>

export const publishJobParamSchema = z.object({
  job_id: z.string().uuid()
})
export type PublishJobParam = z.infer<typeof publishJobParamSchema>

export const archiveJobParamSchema = z.object({
  job_id: z.string().uuid()
})
export type ArchiveJobParam = z.infer<typeof archiveJobParamSchema>

export const updateJobBodySchema = z.object({
  title: z.string(),
  location: z.string(),
  description: z.string()
})
export type UpdateJobBody = z.infer<typeof updateJobBodySchema>

export const updateJobParamSchema = z.object({
  job_id: z.string().uuid()
})
export type UpdateJobParam = z.infer<typeof updateJobParamSchema>

export const deleteJobParamSchema = z.object({
  job_id: z.string().uuid()
})
export type DeleteJobParam = z.infer<typeof deleteJobParamSchema>
