import Filter from './../enums/Filter'
import Sort from './../enums/Sort'

interface IRequestQuery {
  pageNo: number
  filter: Filter
  sort: Sort
  userId?: string
  search?: string
}

export default IRequestQuery
