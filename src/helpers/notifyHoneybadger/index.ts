import { Request } from 'express'
import Honeybadger from '@honeybadger-io/js'

type Options = {
  name: string
  message?: Record<string, unknown>
}

const notifyHoneybadger = (req: Request, options: Options): void => {
  if (process.env.NODE_ENV !== 'test') {
    Honeybadger.notify({
      name: options.name,
      message: JSON.stringify({
        requestId: req.id,
        method: req.method,
        path: req.path,
        decoded: req.decoded || null,
        ...(options.message || {}),
      }),
    })
  }
}

export default notifyHoneybadger
