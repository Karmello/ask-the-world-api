import { ObjectId } from 'mongodb'

interface IAnswer {
  _id: ObjectId | string
  questionId: ObjectId | string
  answererId: ObjectId | string
  answeredAt: number
  selectedIndexes: number[]
}

export default IAnswer
