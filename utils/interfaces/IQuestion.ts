import IAnswer from './IAnswer'

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
}

export default IQuestion
