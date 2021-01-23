import IAnswer from './IAnswer'
import IReport from './IReport'

interface IQuestion {
  _id: any
  userId: any
  timestamp: number
  text: string
  answers: IAnswer[]
  options: {
    multipleChoice: boolean
    maxSelectable: number
  }
  answeredTimes: number
  watchers: any[]
  watched: boolean
  reports: IReport[]
}

export default IQuestion
