import { Request, Response, NextFunction } from 'express'

import msgs from 'utils/msgs'

export default (req: Request, res: Response, next: NextFunction) => {
  const username = req.body?.username
  const password = req.body?.password

  if (username && password) {
    next()
  } else {
    res.status(401).send({
      msg: msgs.NO_CREDENTIALS_PROVIDED,
    })
  }
}
