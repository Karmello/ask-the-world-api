import mongoose from 'mongoose'
import { NextFunction } from 'express'
import isArray from 'lodash/isArray'

import { QUESTION_INPUT_MIN_LENGTH, QUESTION_INPUT_MAX_LENGTH } from 'shared/utils/index'
import { ModelName, IQuestionDoc, IQuestionModel } from 'utils/index'
import { ReportModel } from 'models/index'

import {
  checkMinLength,
  checkMaxLength,
  checkMaxSelectableAnswers,
  checkAnswers,
} from 'validation/index'

const { model, Schema } = mongoose

const questionSchema = new Schema(
  {
    userId: {
      ref: ModelName.User,
      type: Schema.Types.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
      validate: [
        checkMinLength(QUESTION_INPUT_MIN_LENGTH),
        checkMaxLength(QUESTION_INPUT_MAX_LENGTH),
      ],
    },
    answers: [
      {
        type: String,
        required: true,
      },
    ],
    options: {
      multipleChoice: {
        type: Boolean,
        required: true,
        default: false,
      },
      maxSelectable: {
        type: Number,
        required: true,
        default: 1,
        validate: [checkMaxSelectableAnswers],
      },
    },
    timestamp: {
      type: Number,
      required: true,
    },
    answeredTimes: {
      type: Number,
      required: true,
      default: 0,
    },
    watchers: [
      {
        type: Schema.Types.ObjectId,
        ref: ModelName.User,
        default: [],
      },
    ],
    reports: [ReportModel.schema],
  },
  {
    versionKey: false,
  }
)

questionSchema.path('answers').validate(checkAnswers)

questionSchema.pre('save', function (next: NextFunction) {
  const doc = this as IQuestionDoc
  if (!doc.isNew) doc.answeredTimes += 1
  next()
})

questionSchema.statics.transformBeforeSend = (
  data: IQuestionDoc[] | IQuestionDoc,
  userId?: string
) => {
  //
  const transform = (question: IQuestionDoc) => {
    //
    question.watched = question.watchers.some(id => id.toString() === userId)
    question.reported = question.reports.some(report => report.userId.toString() === userId)
    delete question.watchers
    delete question.reports

    question.answers.forEach(answer => {
      answer.votesInfo = {
        length: answer.votes.length,
        didVote: userId ? answer.votes.some(id => id.equals(userId)) : false,
      }
      delete answer.votes
    })
  }
  isArray(data) ? data.forEach(question => transform(question)) : transform(data)
  return data
}

export default model<IQuestionDoc, IQuestionModel>(ModelName.Question, questionSchema)
