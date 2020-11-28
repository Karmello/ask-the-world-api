import { Document, Model } from 'mongoose'
import { IAnswer } from 'shared/utils/index'

export interface IAnswerDoc extends IAnswer, Document {}

export interface IAnswerModel extends Model<IAnswerDoc> {}
