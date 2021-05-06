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
}

export default IQuestion
