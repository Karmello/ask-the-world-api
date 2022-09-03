import { Request, Response, NextFunction } from 'express'

import msgs from 'utils/msgs'

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.decoded?.confirmed) {
    next()
  } else {
    res.status(403).send({
      msg: msgs.ILLEGAL_ACTION,
    })
  }
}
