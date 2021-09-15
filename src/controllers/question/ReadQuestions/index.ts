import { Application, Request, Response } from 'express'

import { ApiUrlPath, Filter, SortBy } from 'shared/utils/index'
import { verifyAuthToken, verifyRequest } from 'middleware/index'

import readAll from './readAll'
import readOwn from './readOwn'
import readFollowed from './readFollowed'
import readAnswered from './readAnswered'
import readNotAnswered from './readNotAnswered'
import readTop from './readTop'

import Helper from './Helper'

type TQuery = {
  userId: string
  filter: Filter
  sortBy: SortBy
  pageNo: string
  keywords: string
  keywordsMode: Filter
}

export default (app: Application) =>
  app.get(ApiUrlPath.Questions, verifyAuthToken, verifyRequest, (req: Request, res: Response) => {
    //
    const { userId, filter, sortBy, pageNo, keywords, keywordsMode } = req.query as TQuery

    const helper = new Helper(
      req,
      res,
      userId,
      filter,
      sortBy,
      Number(pageNo),
      keywords,
      keywordsMode
    )

    switch (filter) {
      //
      case Filter.All:
        readAll(helper)
        break

      case Filter.NotAnswered:
        readNotAnswered(helper)
        break

      case Filter.Answered:
        readAnswered(helper)
        break

      case Filter.Created:
        readOwn(helper)
        break

      case Filter.Followed:
        readFollowed(helper)
        break

      case Filter.Top:
        readTop(helper)
        break
    }
  })
