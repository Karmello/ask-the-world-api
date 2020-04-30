import { Document } from 'mongoose'
import { IQuestion } from 'shared/utils/index'

interface IQuestionExtended extends IQuestion, Document {}

export default IQuestionExtended
