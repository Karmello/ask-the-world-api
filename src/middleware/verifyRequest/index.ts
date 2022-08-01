import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'

import { Filter, AppError, ApiUrlPath } from 'atw-shared/utils/index'

const ObjectId = mongoose.Types.ObjectId

export default (req: Request, res: Response, next: NextFunction) => {
  //
  const { filter, userId } = req.query

  if (req.route.path === ApiUrlPath.Questions) {
    //
    if (
      [Filter.Answered, Filter.Created, Filter.Followed, Filter.NotAnswered].includes(
        filter as Filter
      ) &&
      !req.decoded
    ) {
      return res.status(403).send(AppError.IllegalAction)
    }

    if (filter === Filter.Created) {
      try {
        new ObjectId(userId.toString())
      } catch (ex) {
        return res.status(403).send(AppError.IllegalAction)
      }
    }
  }

  next()
}
