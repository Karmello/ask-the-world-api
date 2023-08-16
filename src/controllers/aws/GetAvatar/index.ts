import { Application, Request, Response } from 'express'
import aws4 from 'aws4'
import axios from 'axios'

import { ApiUrlPath } from 'atw-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import msgs from 'utils/msgs'

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_URL } = process.env

const axiosInstance = axios.create({ timeout: 25000 })

export default (app: Application) => {
  app.get(
    ApiUrlPath.CreateFollow,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const url = `${AWS_BUCKET_URL}/users/${req.decoded._id}/avatar.png`
      const { hostname, pathname } = new URL(url)

      const signedRequest = aws4.sign(
        {
          method: 'GET',
          host: hostname,
          path: pathname,
          url,
          responseType: 'arraybuffer',
        },
        {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        }
      )

      delete signedRequest.headers.Host
      delete signedRequest.headers['Content-Length']

      axiosInstance(signedRequest)
        .then(data => {
          res.status(200).send({ data })
        })
        .catch(() => {
          res.status(400).send({
            msg: msgs.SOMETHING_WENT_WRONG,
          })
        })
    }
  )
}
