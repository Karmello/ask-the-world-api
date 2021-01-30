import { Document } from 'mongoose'
import { IAnswer, IReport } from 'shared/utils/index'

export interface IAnswerDoc extends IAnswer, Document {}
export interface IReportDoc extends IReport, Document {}
