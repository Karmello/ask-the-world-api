import { ObjectId } from 'mongodb'

interface IQuestion {
  _id: ObjectId | string
  creatorId: ObjectId | string
  createdAt: number
  terminatedAt: number
  categories: string[]
  text: string
  answers: string[]
  numOfVotes: {
    exact?: number
    range?: {
      min: number
      max: number
    }
  }
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
