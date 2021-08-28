import { Request, Response, NextFunction } from 'express'
import { Filter, AppError, ApiUrlPath } from 'shared/utils/index'

export default (req: Request, res: Response, next: NextFunction) => {
  //
  if (req.route.path === ApiUrlPath.Questions) {
    //
    const { userId, filter } = req.query

    if (filter !== Filter.Created && req.decoded?._id !== userId) {
      return res.status(403).send(AppError.IllegalAction)
    }
  }

  next()
}
