import { Request, Response, NextFunction } from 'express'
import Honeybadger from '@honeybadger-io/js'

import msgs from 'utils/msgs'

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.decoded?.isMailToken) {
    next()
  } else {
    Honeybadger.notify(
      JSON.stringify({
        requestId: req.id,
        decoded: req.decoded,
      }),
      'Bad token used for account deactivation'
    )
    res.status(403).send({
      msg: msgs.ILLEGAL_ACTION,
    })
  }
}
