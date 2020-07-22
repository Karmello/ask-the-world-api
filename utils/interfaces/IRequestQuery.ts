interface IRequestQuery {
  query?: {
    userId?: string
  }
  skip?: number
  limit?: number
  sort?: {
    timestamp?: number
    answeredTimes?: number
  }
}

export default IRequestQuery
