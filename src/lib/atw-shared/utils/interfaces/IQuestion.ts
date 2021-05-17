import IAnswer from './IAnswer'
import IFollow from './IFollow'
import IReport from './IReport'

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
