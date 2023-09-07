import { Db } from 'mongodb'

import {
  IUser,
  IQuestion,
  IAnswer,
  IFollow,
  IReport,
  ICountry,
  IQuestionCategory,
} from 'atw-shared/utils'

const getCollections = (db: Db) => {
  const users = db.collection<IUser>('users')
  const questions = db.collection<IQuestion>('questions')
  const answers = db.collection<IAnswer>('answers')
  const follows = db.collection<IFollow>('follows')
  const reports = db.collection<IReport>('reports')
  const countries = db.collection<ICountry>('countries')
  const questionCategories = db.collection<IQuestionCategory>('questioncategories')

  return {
    users,
    questions,
    answers,
    follows,
    reports,
    countries,
    questionCategories,
  }
}

export default getCollections
