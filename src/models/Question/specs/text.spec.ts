import { expect } from 'chai'
import { QuestionModel } from 'models/index'

describe('question text validation', () => {
  it('none => required', () => {
    const question = new QuestionModel()
    const err = question.validateSync()
    expect(err.errors.text.kind).to.eql('required')
  })

  it('undefined => required', () => {
    const question = new QuestionModel({ text: undefined })
    const err = question.validateSync()
    expect(err.errors.text.kind).to.eql('required')
  })

  it('null => required', () => {
    const question = new QuestionModel({ text: null })
    const err = question.validateSync()
    expect(err.errors.text.kind).to.eql('required')
  })

  it('empty string => required', () => {
    const question = new QuestionModel({ text: '' })
    const err = question.validateSync()
    expect(err.errors.text.kind).to.eql('required')
  })

  it('too short => checkMinLength', () => {
    const question = new QuestionModel({ text: 'Wtf ?' })
    const err = question.validateSync()
    expect(err.errors.text.kind).to.eql('checkMinLength')
  })

  it('too long => checkMaxLength', () => {
    const question = new QuestionModel({
      text: 'this is very long questions title, this is very long questions title, this is very long questions title, this is very long questions title, this is very long questions title',
    })
    const err = question.validateSync()
    expect(err.errors.text.kind).to.eql('checkMaxLength')
  })

  it('valid => no error', () => {
    const question = new QuestionModel({
      text: 'Is this title of the newly created question ?',
    })
    const err = question.validateSync()
    expect(err.errors.text).to.eql(undefined)
  })
})
