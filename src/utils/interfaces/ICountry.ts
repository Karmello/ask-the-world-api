import { Document } from 'mongoose'
import { ICou } from 'atw-shared/utils/index'

export interface ICountryDoc extends IAnswer, Document {
  _id: string
}
