import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'

import { Filter } from 'atw-shared/utils/index'
import msgs from 'utils/msgs'

const ObjectId = mongoose.Types.ObjectId

const sendNegativeResponse = (res: Response) => {
  res.status(403).send({
    msg: msgs.ILLEGAL_ACTION,
  })
}

export default (req: Request, res: Response, next: NextFunction) => {
  const { filter, userId } = req.query

  const isFilterValueBad =
    !filter ||
    ![
      Filter.All,
      Filter.Top,
      Filter.NotAnswered,
      Filter.Answered,
      Filter.Created,
      Filter.Followed,
    ].includes(filter as Filter)

  if (isFilterValueBad) {
    return sendNegativeResponse(res)
  }

  const isMissingRequiredUserId = filter === Filter.Created && !userId

  if (isMissingRequiredUserId) {
    return sendNegativeResponse(res)
  }

  if (filter === Filter.Created) {
    try {
      new ObjectId(userId.toString())
    } catch (ex) {
      return sendNegativeResponse(res)
    }
  }

  const isContentNotAllowed =
    !req.decoded && ![Filter.Top, Filter.All].includes(filter as Filter)

  if (isContentNotAllowed) {
    return sendNegativeResponse(res)
  }

  next()
}
