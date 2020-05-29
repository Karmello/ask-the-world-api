import mongoose from 'mongoose'
import { NextFunction } from 'express'

import {
  QUESTION_INPUT_MIN_LENGTH,
  QUESTION_INPUT_MAX_LENGTH,
  ANSWER_INPUT_MAX_LENGTH,
} from 'shared/utils/index'

import { ModelName, IQuestionDoc, IQuestionModel } from 'utils/index'
import { checkMinLength, checkMaxLength } from 'validation/index'

const { model, Schema } = mongoose

const questionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: ModelName.User,
    },
    no: {
      type: Number,
      default: 0,
    },
    timestamp: {
      type: Number,
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
        text: {
          type: String,
          required: true,
          validate: [checkMaxLength(ANSWER_INPUT_MAX_LENGTH)],
        },
        votes: {
          type: [String],
          required: true,
          default: [],
        },
      },
    ],
    answeredTimes: {
      type: Number,
      required: true,
      default: 0,
    },
    options: {
      multipleChoice: {
        type: Boolean,
        required: true,
      },
    },
  },
  {
    versionKey: false,
  }
)

questionSchema.pre('save', function (next: NextFunction) {
  const doc = this as IQuestionDoc
  if (doc.isNew) {
    doc
      .model(ModelName.Question)
      .countDocuments()
      .then((count: number) => {
        doc.no = count += 1
        next()
      })
  } else {
    doc.answeredTimes += 1
    next()
  }
})

questionSchema.statics.transformBeforeSend = (data: IQuestionDoc[], userId?: string) => {
  data.forEach(question => {
    question.answers.forEach(answer => {
      answer.votesInfo = {
        length: answer.votes.length,
        didVote: userId ? answer.votes.includes(userId) : false,
      }
      delete answer.votes
    })
  })
  return data
}

export default model<IQuestionDoc, IQuestionModel>(ModelName.Question, questionSchema)
