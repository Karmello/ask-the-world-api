interface IRequestQuery {
  userId?: string
  skip?: number
  limit?: number
  timestamp?: number
  answeredTimes?: number
  selfAnswered?: boolean
}

export default IRequestQuery
