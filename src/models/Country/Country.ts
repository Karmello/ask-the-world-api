import mongoose from 'mongoose'

import { ModelName, ICountryDoc } from 'utils/index'

const { model, Schema } = mongoose

const countrySchema = new Schema(
  {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
)

export default model<ICountryDoc>(ModelName.Country, countrySchema)
