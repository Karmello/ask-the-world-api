import IAnswer from './IAnswer'

interface IQuestion {
  _id: any
  userId: any
  no: number
  timestamp: number
  text: string
  answers: IAnswer[]
  options: {
    multipleChoice: boolean
    maxSelectable: string
  }
  answeredTimes: number
}

export default IQuestion
