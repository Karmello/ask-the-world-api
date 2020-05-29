import { Document, Model } from 'mongoose'
import { IQuestion } from 'shared/utils/index'

export interface IQuestionDoc extends IQuestion, Document {}

export interface IQuestionModel extends Model<IQuestionDoc> {
  transformBeforeSend(data: IQuestion[], userId?: string): IQuestion[]
}
