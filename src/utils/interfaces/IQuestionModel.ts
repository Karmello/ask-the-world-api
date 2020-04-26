import { Document } from 'mongoose'

interface IQuestionModel extends Document {
  no: number
  answers: Array<any>
}

export default IQuestionModel
