import mongoose from 'mongoose'
import { ModelName } from 'utils/index'

const { model, Schema } = mongoose

const userSchema = new Schema(
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

// userSchema.pre('save', function (next) {
//   const doc = this as IUser
// })

export default model(ModelName.User, userSchema)
