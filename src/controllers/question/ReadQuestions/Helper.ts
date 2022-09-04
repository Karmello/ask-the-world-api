import { Request, Response } from 'express'
import get from 'lodash/get'

import {
  Filter,
  READ_QUESTIONS_MAX,
  READ_TOP_QUESTIONS_MAX,
  SortBy,
} from 'atw-shared/utils/index'

import msgs from 'utils/msgs'

class Helper {
  readonly req: Request
  readonly res: Response

  readonly userId: string
  readonly filter: Filter
  readonly sortBy: SortBy
  readonly skip: number
  readonly limit: number
  readonly limitTop: number
  readonly match: { text?: { [key: string]: RegExp[] | string } }

  constructor(
    req: Request,
    res: Response,
    userId: string,
    filter: Filter,
    sortBy: SortBy,
    pageNo: string,
    keywords: string,
    keywordsMode: Filter
  ) {
    this.req = req
    this.res = res
    this.userId = userId
    this.filter = filter
    this.sortBy = sortBy
    this.skip = (Number(pageNo) - 1) * READ_QUESTIONS_MAX
    this.limit = READ_QUESTIONS_MAX
    this.limitTop = READ_TOP_QUESTIONS_MAX
    this.match = {}

    if (keywords) {
      if (keywordsMode === Filter.All) {
        this.match.text = {
          $all: keywords.split(' ').map(word => new RegExp(word, 'i')),
        }
      } else if (keywordsMode === Filter.Any) {
        this.match.text = {
          $regex: keywords.split(' ').join('|'),
          $options: 'i',
        }
      }
    }
  }

  public endWithSuccess = results =>
    this.res.status(200).send({
      count: get(results[0], 'meta[0].count', 0),
      data: get(results[0], 'docs', []),
    })

  public endWithError = () => {
    this.res.status(400).send({
      msg: msgs.COULD_NOT_GET_DATA,
    })
  }
}

export default Helper
