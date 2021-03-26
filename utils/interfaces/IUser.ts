import { Sex } from './../index'
interface IUser {
  _id: any
  email: string
  username: string
  password: string
  dateOfBirth: string
  country: string
  sex: Sex
  registeredAt: number
  active: boolean
}

export default IUser
