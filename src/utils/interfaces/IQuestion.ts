import { Document } from 'mongoose'
import { IQuestion } from 'atw-shared/utils/index'

export interface IQuestionDoc extends IQuestion, Document {
  _id: string
}
