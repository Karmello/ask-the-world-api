import mongoose from 'mongoose'

interface IQuestion {
  _id: mongoose.Types.ObjectId
  creatorId: mongoose.Types.ObjectId
  createdAt: number
  text: string
  answers: string[]
  options: {
    multipleChoice: boolean
    maxSelectable: number
  }
}

export default IQuestion
