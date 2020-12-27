import { Sex } from './../index'
interface IUser {
  _id: any
  active: boolean
  email: string
  username: string
  password: string
  dateOfBirth: string
  country: string
  sex: Sex
  timestamp: number
}

export default IUser
