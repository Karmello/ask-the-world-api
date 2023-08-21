import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

import { ACTIVITY_LIST_MAX_ITEMS, ApiUrlPath, IActivity } from 'atw-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { QuestionModel, AnswerModel, ReportModel } from 'models/index'
import { sendBadResponse } from 'helpers/index'
import msgs from 'utils/msgs'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetUserActivity,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      Promise.all([
        QuestionModel.aggregate([
          {
            $match: {
              creatorId: new ObjectId(req.decoded._id),
              terminatedAt: { $exists: false },
            },
          },
          {
            $project: {
              _id: '$_id',
              text: '$text',
              createdAt: '$createdAt',
            },
          },
        ]),
        QuestionModel.aggregate([
          {
            $match: {
              creatorId: new ObjectId(req.decoded._id),
              terminatedAt: { $exists: true },
            },
          },
          {
            $project: {
              _id: '$_id',
              text: '$text',
              terminatedAt: '$terminatedAt',
            },
          },
        ]),
        AnswerModel.aggregate([
          { $match: { answererId: new ObjectId(req.decoded._id) } },
          {
            $lookup: {
              from: 'questions',
              localField: 'questionId',
              foreignField: '_id',
              as: 'question',
            },
          },
          {
            $project: {
              _id: { $first: '$question._id' },
              text: { $first: '$question.text' },
              answeredAt: '$answeredAt',
            },
          },
        ]),
        ReportModel.aggregate([
          { $match: { reporterId: new ObjectId(req.decoded._id) } },
          {
            $lookup: {
              from: 'questions',
              localField: 'questionId',
              foreignField: '_id',
              as: 'question',
            },
          },
          {
            $project: {
              _id: { $first: '$question._id' },
              text: { $first: '$question.text' },
              reportedAt: '$reportedAt',
            },
          },
        ]),
      ])
        .then(results => {
          const activities = [
            ...results[0],
            ...results[1],
            ...results[2],
            ...results[3],
          ] as unknown as IActivity[]
          activities.sort((a, b) => {
            return (
              (b.createdAt || b.answeredAt || b.terminatedAt || b.reportedAt) -
              (a.createdAt || a.answeredAt || a.terminatedAt || a.reportedAt)
            )
          })
          res.status(200).send({ data: activities.slice(0, ACTIVITY_LIST_MAX_ITEMS) })
        })
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
        })
    }
  )
}
