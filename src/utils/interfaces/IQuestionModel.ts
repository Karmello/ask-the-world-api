import { Document } from 'mongoose'

interface IQuestionSchema extends Document {
  answers: Array<any>
}

export default IQuestionSchema
