import mongoose from 'mongoose'
import { ModelName, IQuestionModel } from 'utils/index'

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
  { versionKey: false }
)

questionSchema.pre('save', function (next) {
  const doc = this as IQuestionModel
  if (doc.isNew) {
    doc
      .model(ModelName.Question)
      .countDocuments()
      .then(count => {
        doc.no = count += 1
        next()
      })
  } else {
    next()
  }
})

export default model(ModelName.Question, questionSchema)
