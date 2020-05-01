import mongoose from 'mongoose'
import { ModelName, IQuestion } from 'utils/index'

const { model, Schema } = mongoose

const questionSchema = new Schema(
  {
    no: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      required: true,
    },
    answers: [
      {
        text: {
          type: String,
          required: true,
        },
        votes: {
          type: [String],
          required: true,
          default: [],
        },
      },
    ],
    options: {
      multipleChoice: {
        type: Boolean,
        required: true,
      },
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform: function (doc: IQuestion, ret: IQuestion) {
        ret.answers.forEach(item => {
          item.votesInfo = {
            length: item.votes.length,
            didVote: item.votes.includes('123412341234123412341234'),
          }
          delete item.votes
        })
      },
    },
  }
)

questionSchema.pre('save', function (next) {
  const doc = this as IQuestion
  if (doc.isNew) {
    doc
      .model(ModelName.Question)
      .countDocuments()
      .then((count: number) => {
        doc.no = count += 1
        next()
      })
  } else {
    next()
  }
})

export default model(ModelName.Question, questionSchema)
