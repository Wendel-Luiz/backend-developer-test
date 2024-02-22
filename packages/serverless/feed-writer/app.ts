import { S3 } from '@aws-sdk/client-s3'
import { APIGatewayProxyResultV2 } from 'aws-lambda'
import { env } from './config/config'
import { Repository } from './repository'

export const handler = async (): Promise<APIGatewayProxyResultV2> => {
  try {
    const s3 = new S3()
    const repo = new Repository()

    const jobs = await repo.findAllPublished()

    await s3.putObject({
      Bucket: env.BUCKET,
      Key: env.S3KEY,
      Body: JSON.stringify(jobs)
    })

    return {
      statusCode: 200
    }
  } catch (err) {
    console.log('error', err)
    return {
      statusCode: 500
    }
  }
}
