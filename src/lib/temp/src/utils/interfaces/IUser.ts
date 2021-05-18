import { Sex } from './../index'

interface IUser {
  _id: any
  registeredAt: number
  active: boolean
  email: string
  username: string
  password: string
  dateOfBirth: string
  country: string
  sex: Sex
}

export default IUser
