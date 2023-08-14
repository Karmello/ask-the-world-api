import { Document } from 'mongoose'
import { IAnswer } from 'atw-shared/utils/index'

export interface IAnswerDoc extends IAnswer, Document {
  _id: string
}
