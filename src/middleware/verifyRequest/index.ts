import { Request, Response, NextFunction } from 'express'
import { Filter, AppError, ApiUrlPath } from 'shared/utils/index'

export default (req: Request, res: Response, next: NextFunction) => {
  //
  if (req.route.path === ApiUrlPath.Questions) {
    //
    if (
      [Filter.Answered, Filter.Created, Filter.Followed, Filter.NotAnswered].includes(
        req.query.filter as Filter
      ) &&
      !req.decoded
    ) {
      return res.status(403).send(AppError.IllegalAction)
    }
  }

  next()
}
