// import { Application, Request, Response } from 'express'

// import { userAuthMiddleware } from 'middleware/index'
// import { SEARCH_QUESTIONS_MAX, ApiUrlPath } from 'shared/utils/index'
// import { QuestionModel } from 'models/index'

// export default (app: Application) =>
//   app.get(ApiUrlPath.SearchQuestions, userAuthMiddleware, (req: Request, res: Response) => {
//     //
//     let offset = 0
//     const { pageNo } = req.query

//     if (pageNo) offset = (Number(pageNo) - 1) * SEARCH_QUESTIONS_MAX

//     const query = {}

//     Promise.all([
//       QuestionModel.countDocuments(query),
//       QuestionModel.find(query)
//         .sort({ timestamp: -1 })
//         .skip(offset)
//         .limit(SEARCH_QUESTIONS_MAX)
//         .lean(true),
//     ]).then(
//       results =>
//         res.status(200).send({
//           count: results[0],
//           data: QuestionModel.transformBeforeSend(results[1], req.decoded?._id),
//         }),
//       err => res.status(400).send(err)
//     )
//   })
