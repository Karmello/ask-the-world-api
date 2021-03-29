import mongoose from 'mongoose'

interface IAnswer {
  _id: mongoose.Types.ObjectId
  questionId: mongoose.Types.ObjectId
  answererId: mongoose.Types.ObjectId
  answeredAt: number
  selectedIndexes: number[]
}

export default IAnswer
