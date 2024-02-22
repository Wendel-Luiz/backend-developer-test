import { S3 } from '@aws-sdk/client-s3'
import { APIGatewayProxyResultV2 } from 'aws-lambda'
import { env } from './config/config'

export const handler = async (): Promise<APIGatewayProxyResultV2> => {
  try {
    const s3 = new S3()

    const { Body } = await s3.getObject({
      Bucket: env.BUCKET,
      Key: env.S3KEY
    })

    const data = await Body?.transformToString()

    return {
      statusCode: 200,
      body: data ?? ''
    }
  } catch (err) {
    console.log('Error: ', err)
    return {
      statusCode: 500,
      body: 'Internal Server Error'
    }
  }
}
