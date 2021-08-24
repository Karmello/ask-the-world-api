import Filter from './../enums/Filter'
import SortBy from './../enums/SortBy'

interface IRequestQuery {
  userId?: string
  filter: Filter
  sortBy: SortBy
  pageNo: number
  keywords?: string
  keywordsMode?: string
}

export default IRequestQuery
