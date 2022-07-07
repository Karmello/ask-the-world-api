import { ObjectId } from 'mongodb'

interface IQuestion {
  _id: ObjectId | string
  creatorId: ObjectId | string
  createdAt: number
  text: string
  answers: string[]
  options: {
    multipleChoice: boolean
    maxSelectable: number
  }
  voting?: {
    answersCount: number
    all: {
      [key: number]: number
    }
    requestor: number[]
  }
  isFollowedByRequestor?: boolean
  ui?: {
    no: number
    visible: boolean
  }
}

export default IQuestion
