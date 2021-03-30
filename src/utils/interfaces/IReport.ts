import { Document } from 'mongoose'
import { IReport } from 'shared/utils/index'

export interface IReportDoc extends IReport, Document {}
