import { ObjectId } from 'mongodb'

interface IQuestion {
  _id: ObjectId | string
  creatorId: ObjectId | string
  createdAt: number
  text: string
  answers: string[]
  numOfVotes: {
    exact: number
    min: number
    max: number
  }
  isStopped: boolean
  meta: {
    voting?: {
      answersCount: number
      all: {
        [key: number]: number
      }
      requestor: number[]
    }
    isFollowedByRequestor?: boolean
  }
}

export default IQuestion
