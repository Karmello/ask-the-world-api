import { Application, Request, Response } from 'express'

import { ApiUrlPath, IAnswer } from 'atw-shared/utils/index'
import { IQuestionDoc } from 'utils/index'
import { readAuthToken } from 'middleware/index'
import { QuestionModel, AnswerModel, FollowModel } from 'models/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.get(ApiUrlPath.QuestionRandom, readAuthToken, (req: Request, res: Response) => {})
}
