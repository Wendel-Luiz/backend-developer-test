import { SQSEvent, SQSHandler, SQSRecord } from 'aws-lambda'
import OpenAI from 'openai'
import { env } from './config/config'
import { Repository } from './repository'

export const handler: SQSHandler = async (event: SQSEvent): Promise<void> => {
  const repo = new Repository()
  const openAi = new OpenAI({ apiKey: env.OPEN_AI_KEY })

  for (const message of event.Records) {
    await processMessageAsync(message, repo, openAi)
  }
}

async function processMessageAsync(
  message: SQSRecord,
  repository: Repository,
  openAi: OpenAI
): Promise<void> {
  try {
    const id = message.body
    const job = await repository.findById(id)

    if (!job) {
      throw new Error(`Job of id ${id} Not Found`)
    }

    const titleModerated = await openAi.moderations.create({ input: job.title })
    const descriptionModerated = await openAi.moderations.create({
      input: job.description
    })

    const isTitleApproved = !titleModerated.results.some(
      (result) => result.flagged
    )
    const isDescriptionApproved = !descriptionModerated.results.some(
      (result) => result.flagged
    )

    if (isTitleApproved && isDescriptionApproved) {
      await repository.publish(id)
      return
    }

    const notes = {
      titleNotes: titleModerated.results,
      descriptionNotes: descriptionModerated.results
    }

    await repository.reject(id, JSON.stringify(notes))
  } catch (err) {
    console.error('An error occurred', err)
    throw err
  }
}
