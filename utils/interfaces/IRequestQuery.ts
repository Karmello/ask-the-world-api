interface IRequestQuery {
  userId?: string
  skip?: number
  limit?: number
  timestamp?: number
  answeredTimes?: number
  selfAnswered?: number
}

export default IRequestQuery
