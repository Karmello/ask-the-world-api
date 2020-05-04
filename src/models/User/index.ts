import mongoose from 'mongoose'
import { ModelName, IQuestion } from 'utils/index'

const { model, Schema } = mongoose

const questionSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    // toJSON: {
    //   transform: function (doc, ret) {},
    // },
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
    doc.answeredTimes += 1
    next()
  }
})

export default model(ModelName.Question, questionSchema)
