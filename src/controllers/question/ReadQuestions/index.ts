import { Application, Request, Response } from 'express'

import { ApiUrlPath, Filter, SortBy } from 'atw-shared/utils/index'
import { readAuthToken } from 'middleware/index'

import checkRequest from './checkRequest'
import Helper from './Helper'

import readAll from './readAll'
import readCreated from './readCreated'
import readFollowed from './readFollowed'
import readAnswered from './readAnswered'
import readNotAnswered from './readNotAnswered'
import readTop from './readTop'

type TQuery = {
  userId: string
  filter: Filter
  sortBy: SortBy
  pageNo: string
  keywords: string
  keywordsMode: Filter
}

export default (app: Application) => {
  app.get(
    ApiUrlPath.Questions,
    readAuthToken,
    checkRequest,
    (req: Request, res: Response) => {
      const { userId, filter, sortBy, pageNo, keywords, keywordsMode } =
        req.query as TQuery

      const helper = new Helper(
        req,
        res,
        userId,
        filter,
        sortBy,
        pageNo,
        keywords,
        keywordsMode
      )

      switch (filter) {
        case Filter.All:
          readAll(helper)
          break

        case Filter.Top:
          readTop(helper)
          break

        case Filter.NotAnswered:
          readNotAnswered(helper)
          break

        case Filter.Answered:
          readAnswered(helper)
          break

        case Filter.Created:
          readCreated(helper)
          break

        case Filter.Followed:
          readFollowed(helper)
          break
      }
    }
  )
}
