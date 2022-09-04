import { IQuestion } from 'atw-shared/utils'

export default (selectedIndexes: number[], question: IQuestion) => {
  const {
    answers,
    options: { maxSelectable },
  } = question
  return (
    selectedIndexes.length >= 1 &&
    selectedIndexes.length <= maxSelectable &&
    !selectedIndexes.some(n => {
      return n < 0 || n > answers.length - 1
    })
  )
}
