import { Document } from 'mongoose'
import { IAnswer } from 'shared/utils/index'

export interface IAnswerDoc extends IAnswer, Document {}
