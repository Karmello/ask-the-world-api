import { Request, Response } from 'express'
import Honeybadger from '@honeybadger-io/js'

import { AppMsg } from 'atw-shared/utils'
import msgs from 'utils/msgs'

type ResBody =
  | {
      msg?: AppMsg
      valErr?: unknown
    }
  | string

type Message = {
  err?: unknown
  req: {
    _id: string
    path: string
    method: string
    body: unknown
  }
  res: {
    code: number
    body: ResBody
  }
}

const { NODE_ENV } = process.env

const sendBadResponse = (
  req: Request,
  res: Response,
  resCode: number,
  resBody: ResBody,
  err?: unknown
) => {
  if (NODE_ENV !== 'test' && resCode >= 400) {
    const message = {} as Message

    if (err) {
      message.err = err
    }

    message.req = {
      _id: req.id,
      path: req.path,
      method: req.method,
      body: req.body,
    }

    message.res = {
      code: resCode,
      body: resBody,
    }

    Honeybadger.notify({
      name:
        typeof resBody === 'string' || !resBody.msg
          ? msgs.SOMETHING_WENT_WRONG.code
          : resBody.msg?.code,
      message: JSON.stringify(message),
    })
  }

  return res.status(resCode).send(resBody)
}

export default sendBadResponse
