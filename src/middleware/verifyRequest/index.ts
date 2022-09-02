import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'

import { Filter, ApiUrlPath } from 'atw-shared/utils/index'
import msgs from 'utils/msgs'

const ObjectId = mongoose.Types.ObjectId

export default (req: Request, res: Response, next: NextFunction) => {
  const { filter, userId } = req.query

  if (req.route.path === ApiUrlPath.Questions) {
    if (
      [Filter.Answered, Filter.Created, Filter.Followed, Filter.NotAnswered].includes(
        filter as Filter
      ) &&
      !req.decoded
    ) {
      return res.status(403).send(msgs.ILLEGAL_ACTION)
    }

    if (filter === Filter.Created) {
      try {
        new ObjectId(userId.toString())
      } catch (ex) {
        return res.status(403).send(msgs.ILLEGAL_ACTION)
      }
    }
  }

  next()
}
