import { Sex } from './../index'

import IPayment from './IPayment'

interface IUser {
  _id: any
  email: string
  username: string
  password: string
  dateOfBirth: string
  country: string
  sex: Sex
  config: {
    registeredAt: number
    confirmed: boolean
    payment?: IPayment & boolean
  }
}

export default IUser
