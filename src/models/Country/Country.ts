import mongoose from 'mongoose'

import { ModelName, IReportDoc } from 'utils/index'

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

export default model<IReportDoc>(ModelName.Country, countrySchema)
