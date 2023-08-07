import { expect } from 'chai'
import { QuestionModel } from 'models/index'

describe('question options validation', () => {
  it('none => checkOptions', () => {
    const question = new QuestionModel()
    const err = question.validateSync()
    expect(err.errors.options.kind).to.eql('checkOptions')
  })

  it('undefined => checkOptions', () => {
    const question = new QuestionModel({ options: undefined })
    const err = question.validateSync()
    expect(err.errors.options.kind).to.eql('checkOptions')
  })

  it('null => checkOptions', () => {
    const question = new QuestionModel({ options: null })
    const err = question.validateSync()
    expect(err.errors.options.kind).to.eql('checkOptions')
  })

  it('empty string => checkOptions', () => {
    const question = new QuestionModel({ options: '' })
    const err = question.validateSync()
    expect(err.errors.options.kind).to.eql('checkOptions')
  })

  it('string => checkOptions', () => {
    const question = new QuestionModel({ options: 'string' })
    const err = question.validateSync()
    expect(err.errors.options.kind).to.eql('checkOptions')
  })

  it('empty array => checkOptions', () => {
    const question = new QuestionModel({ options: [] })
    const err = question.validateSync()
    expect(err.errors.options.kind).to.eql('checkOptions')
  })

  it('wrong size array => checkOptions', () => {
    const question = new QuestionModel({ options: ['answer1'] })
    const err = question.validateSync()
    expect(err.errors.options.kind).to.eql('checkOptions')
  })

  it('wrong size array => checkOptions', () => {
    const question = new QuestionModel({
      options: [
        'answer1',
        'answer2',
        'answer3',
        'answer4',
        'answer5',
        'answer6',
        'answer7',
        'answer8',
        'answer9',
        'answer10',
        'answer11',
      ],
    })
    const err = question.validateSync()
    expect(err.errors.options.kind).to.eql('checkOptions')
  })

  it('empty answer => checkOptions', () => {
    const question = new QuestionModel({ options: ['answer1', 'answer2', ''] })
    const err = question.validateSync()
    expect(err.errors.options.kind).to.eql('checkOptions')
  })

  it('valid => no error', () => {
    const question = new QuestionModel({ options: ['1', '2', '3', '4'] })
    const err = question.validateSync()
    expect(err.errors.options).to.eql(undefined)
  })

  it('valid => no error', () => {
    const question = new QuestionModel({ options: ['answer1', 'answer2', 'answer3'] })
    const err = question.validateSync()
    expect(err.errors.options).to.eql(undefined)
  })
})
