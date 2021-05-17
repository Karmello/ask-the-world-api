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
  followsCollection?: IFollow[]
  reportsCollection?: IReport[]
  meta?: {
    isFollowedByAuthUser: boolean
  }
}

export default IQuestion
