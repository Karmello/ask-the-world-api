interface IRequestQuery {
  query: {
    userId: string
  }
  skip: number
  limit: number
  sort: {}
}

export default IRequestQuery
