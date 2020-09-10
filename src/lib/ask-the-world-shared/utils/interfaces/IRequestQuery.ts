interface IRequestQuery {
  userId?: string
  skip?: number
  limit?: number
  timestamp?: number
  answeredTimes?: number
  selfAnswered?: number
  keywords?: string
  keywordsMode?: string
}

export default IRequestQuery
