import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'

import { Filter } from 'atw-shared/utils/index'

const ObjectId = mongoose.Types.ObjectId

export default (req: Request, res: Response, next: NextFunction) => {
  if (
    !req.query.filter ||
    ![
      Filter.All,
      Filter.Top,
      Filter.NotAnswered,
      Filter.Answered,
      Filter.Created,
      Filter.Followed,
    ].includes(req.query.filter as Filter) ||
    (!req.decoded?.confirmed &&
      ![Filter.Top, Filter.All].includes(req.query.filter as Filter))
  ) {
    req.query.filter = Filter.All
  }

  if (!req.query.pageNo) {
    req.query.pageNo = '1'
  }

  if (!req.query.userId) {
    req.query.userId = null
  } else {
    try {
      new ObjectId(String(req.query.userId))
    } catch (ex) {
      req.query.userId = null
    }
  }

  next()
}
