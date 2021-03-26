import IReport from './IReport'

interface IQuestion {
  _id: any
  userId: any
  text: string
  answers: string[]
  options: {
    multipleChoice: boolean
    maxSelectable: number
  }
  timestamp: number
  answeredTimes: number
  watchers: any[]
  reports: IReport[]
  //
  watched: boolean
  reported: boolean
}

export default IQuestion
