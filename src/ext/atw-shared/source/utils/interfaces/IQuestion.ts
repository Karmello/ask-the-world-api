import { ObjectId } from 'mongodb'

interface IQuestion {
  _id: ObjectId | string
  creatorId: ObjectId | string
  createdAt: number
  terminatedAt?: number
  categories: string[]
  text: string
  options: string[]
  selectableOptions: {
    exact?: number
    range?: {
      min: number
      max: number
    }
  }
  isRequestorFollowing?: boolean
  submittedTimes?: number
  answeredStats?: {
    all: {
      [key: number]: number
    }
    byRequestor: number[]
  }
}

export default IQuestion
