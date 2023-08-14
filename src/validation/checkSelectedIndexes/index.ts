import { IQuestion } from 'atw-shared/utils'

export default (selectedIndexes: number[], question: IQuestion): boolean => {
  const {
    options,
    selectableOptions: { exact, range },
  } = question

  if (!selectedIndexes?.length) {
    return false
  }

  if (new Set(selectedIndexes).size !== selectedIndexes.length) {
    return false
  }

  if (exact !== undefined) {
    if (selectedIndexes.length !== exact) {
      return false
    }
  } else if (range !== undefined) {
    if (selectedIndexes.length < range.min || selectedIndexes.length > range.max) {
      return false
    }
  }

  if (
    selectedIndexes.some(n => {
      return n < 0 || n > options.length - 1
    })
  ) {
    return false
  }

  return true
}
