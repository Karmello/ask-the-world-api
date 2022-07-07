import { ObjectId } from 'mongodb'

import { Sex } from './../index'
import IPayment from './IPayment'

interface IUser {
  _id: ObjectId | string
  email: string
  username: string
  password: string
  dateOfBirth: string
  country: string
  sex: Sex
  config: {
    registeredAt: number
    confirmed: boolean
    payment?: IPayment
  }
}

export default IUser
