import { Application, Request, Response } from 'express'

import { READ_QUESTIONS_MAX, ApiUrlPath } from 'shared/utils/index'
import { IQuestion } from 'utils/index'
import { QuestionModel } from 'models/index'

export default (app: Application) =>
  app.get(ApiUrlPath.ReadOwnAnsweredQuestions, (req: Request, res: Response) => {
    //
    let offset = 0
    const { pageNo } = req.query

    if (pageNo) offset = (Number(pageNo) - 1) * READ_QUESTIONS_MAX

    const query = {
      answers: {
        $elemMatch: {
          votes: /.*123412341234123412341234.*/i,
        },
      },
    }

    QuestionModel.countDocuments(query, (err, count) => {
      //
      if (err) res.status(400).send(err)

      QuestionModel.find(query)
        .skip(offset)
        .limit(READ_QUESTIONS_MAX)
        .then(data => {
          res.status(200).send({
            data,
            count,
          })
        })
        .catch(err => res.status(400).send(err))
    })
  })
