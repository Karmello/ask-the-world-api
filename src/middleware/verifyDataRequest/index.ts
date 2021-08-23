import { Request, Response, NextFunction } from 'express'
import { Filter } from 'shared/utils/index'

export default (req: Request, res: Response, next: NextFunction) => {
  //
  const { userId, filter } = req.query

  if (
    // not authorized, filter other than ALL
    (!req.decoded?._id && filter !== Filter.All) ||
    // authorized, requesting someone else's questions, filter other than CREATED
    (req.decoded?._id && req.decoded?._id !== userId && filter !== Filter.Created)
  ) {
    return res.status(400).send()
  }

  next()
}
