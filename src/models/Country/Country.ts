import mongoose from 'mongoose'

import { ModelName, ICountryDoc } from 'utils/index'

const { model, Schema } = mongoose

const countrySchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
)

export default model<ICountryDoc>(ModelName.Country, countrySchema)
