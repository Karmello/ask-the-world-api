import IAnswer from './IAnswer'

interface IQuestion {
  _id: any
  creatorId: any
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
