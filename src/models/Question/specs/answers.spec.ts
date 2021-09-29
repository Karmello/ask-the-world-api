import { expect } from 'chai'
import { QuestionModel } from 'models/index'

describe('question answers validation', () => {
  //
  it('none => checkAnswers', () => {
    const question = new QuestionModel()
    const err = question.validateSync()
    expect(err.errors.answers.kind).to.eql('checkAnswers')
  })

  it('undefined => checkAnswers', () => {
    const question = new QuestionModel({ answers: undefined })
    const err = question.validateSync()
    expect(err.errors.answers.kind).to.eql('checkAnswers')
  })

  it('null => checkAnswers', () => {
    const question = new QuestionModel({ answers: null })
    const err = question.validateSync()
    expect(err.errors.answers.kind).to.eql('checkAnswers')
  })

  it('empty string => checkAnswers', () => {
    const question = new QuestionModel({ answers: '' })
    const err = question.validateSync()
    expect(err.errors.answers.kind).to.eql('checkAnswers')
  })

  it('string => checkAnswers', () => {
    const question = new QuestionModel({ answers: 'string' })
    const err = question.validateSync()
    expect(err.errors.answers.kind).to.eql('checkAnswers')
  })

  it('empty array => checkAnswers', () => {
    const question = new QuestionModel({ answers: [] })
    const err = question.validateSync()
    expect(err.errors.answers.kind).to.eql('checkAnswers')
  })

  it('wrong size array => checkAnswers', () => {
    const question = new QuestionModel({ answers: ['answer1'] })
    const err = question.validateSync()
    expect(err.errors.answers.kind).to.eql('checkAnswers')
  })

  it('wrong size array => checkAnswers', () => {
    const question = new QuestionModel({
      answers: [
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
    expect(err.errors.answers.kind).to.eql('checkAnswers')
  })

  it('empty answer => checkAnswers', () => {
    const question = new QuestionModel({ answers: ['answer1', 'answer2', ''] })
    const err = question.validateSync()
    expect(err.errors.answers.kind).to.eql('checkAnswers')
  })

  it('valid => no error', () => {
    const question = new QuestionModel({ answers: ['1', '2', '3', '4'] })
    const err = question.validateSync()
    expect(err.errors.answers).to.eql(undefined)
  })

  it('valid => no error', () => {
    const question = new QuestionModel({ answers: ['answer1', 'answer2', 'answer3'] })
    const err = question.validateSync()
    expect(err.errors.answers).to.eql(undefined)
  })
})
