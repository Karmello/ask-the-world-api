import { Sex } from './../index'

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
    payment?: {
      orderID: string
      status: string
      update_time: string
      amount: {
        currency_code: string
        value: string
      }
    }
  }
}

export default IUser
