import { expect } from 'chai'
import { QuestionModel } from 'models/index'

describe('question options validation', () => {
  //
  it('wrong maxSelectable => checkMaxSelectableAnswers', () => {
    const question = new QuestionModel({
      options: { multipleChoice: false, maxSelectable: 2 },
    })
    const err = question.validateSync()
    expect(err.errors['options.maxSelectable'].kind).to.eql('checkMaxSelectableAnswers')
  })

  it('wrong maxSelectable => checkMaxSelectableAnswers', () => {
    const question = new QuestionModel({
      options: { multipleChoice: true, maxSelectable: 1 },
    })
    const err = question.validateSync()
    expect(err.errors['options.maxSelectable'].kind).to.eql('checkMaxSelectableAnswers')
  })

  it('too big maxSelectable => checkMaxSelectableAnswers', () => {
    const question = new QuestionModel({
      options: { multipleChoice: true, maxSelectable: 10 },
    })
    const err = question.validateSync()
    expect(err.errors['options.maxSelectable'].kind).to.eql('checkMaxSelectableAnswers')
  })

  it('too big maxSelectable => checkMaxSelectableAnswers', () => {
    const question = new QuestionModel({
      answers: ['1', '2', '3'],
      options: { multipleChoice: true, maxSelectable: 4 },
    })
    const err = question.validateSync()
    expect(err.errors['options.maxSelectable'].kind).to.eql('checkMaxSelectableAnswers')
  })

  it('valid => no error', () => {
    const question = new QuestionModel({
      options: { multipleChoice: false, maxSelectable: 1 },
    })
    const err = question.validateSync()
    expect(err.errors['options.maxSelectable']).to.eql(undefined)
  })

  it('valid => no error', () => {
    const question = new QuestionModel({
      answers: ['1', '2', '3', '4'],
      options: { multipleChoice: true, maxSelectable: 4 },
    })
    const err = question.validateSync()
    expect(err.errors['options.maxSelectable']).to.eql(undefined)
  })
})
