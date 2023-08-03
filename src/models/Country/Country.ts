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
      en: {
        type: String,
        required: true,
      },
      pl: {
        type: String,
        required: true,
      },
    },
  },
  {
    versionKey: false,
  }
)

export default model<ICountryDoc>(ModelName.Country, countrySchema)
