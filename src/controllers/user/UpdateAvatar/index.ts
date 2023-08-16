import { Application, Request, Response } from 'express'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import { ApiUrlPath } from 'atw-shared/utils/index'
import msgs from 'utils/msgs'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { base64ToBuffer } from 'helpers/index'

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } = process.env

const client = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
})

export default (app: Application) => {
  app.post(
    ApiUrlPath.UpdateAvatar,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const data = base64ToBuffer(req.body.data)

      const command = new PutObjectCommand({
        Bucket: AWS_BUCKET_NAME,
        Key: `/users/${req.body._id}/avatar.png`,
        Body: data,
      })

      client
        .send(command)
        .then(() => {
          res.status(200).send({
            msg: msgs.AVATAR_UPDATED,
          })
        })
        .catch(() => {
          res.status(400).send({
            msg: msgs.SOMETHING_WENT_WRONG,
          })
        })
    }
  )
}
