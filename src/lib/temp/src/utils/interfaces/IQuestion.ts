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
  answersCollection?: IAnswer[]
  meta?: {
    isFollowedByAuthUser: boolean
  }
}

export default IQuestion
