import mongoose from 'mongoose'

interface IFollow {
  _id: mongoose.Types.ObjectId
  questionId: mongoose.Types.ObjectId
  followerId: mongoose.Types.ObjectId
  followedAt: number
}

export default IFollow
