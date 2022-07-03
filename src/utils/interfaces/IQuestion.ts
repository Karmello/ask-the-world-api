import { Document, Model } from 'mongoose'
import { IQuestion } from 'shared/utils/index'

export interface IQuestionDoc extends IQuestion, Document {
  _id: any
}

export interface IQuestionModel extends Model<IQuestionDoc> {}
