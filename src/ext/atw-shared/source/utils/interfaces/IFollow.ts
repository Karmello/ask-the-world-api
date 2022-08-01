import { ObjectId } from 'mongodb'

interface IFollow {
  _id: ObjectId | string
  questionId: ObjectId | string
  followerId: ObjectId | string
  followedAt: number
}

export default IFollow
