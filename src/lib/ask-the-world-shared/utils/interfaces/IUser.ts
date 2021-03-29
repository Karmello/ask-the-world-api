import mongoose from 'mongoose'
import { Sex } from './../index'

interface IUser {
  _id: mongoose.Types.ObjectId
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
