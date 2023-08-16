import { Request, Response } from 'express'
import Honeybadger from '@honeybadger-io/js'

import { AppMsg } from 'atw-shared/utils'

type ResBody = {
  msg: AppMsg
}

const { NODE_ENV } = process.env

const sendResponse = (req: Request, res: Response, resCode: number, resBody: ResBody) => {
  if (NODE_ENV !== 'test' && resCode >= 400) {
    Honeybadger.notify({
      name: resBody.msg.code,
      message: JSON.stringify({
        req: {
          _id: req.id,
          path: req.path,
          method: req.method,
        },
        res: {
          code: resCode,
          body: resBody,
        },
      }),
    })
  }

  return res.status(resCode).send(resBody)
}

export default sendResponse
