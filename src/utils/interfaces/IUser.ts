import { Document } from 'mongoose'
import { NextFunction } from 'express'
import { IUser } from 'shared/utils/index'

export interface IUserDoc extends IUser, Document {
  _id: string
  hashPassword: (next: NextFunction) => void
  comparePasswords: (current: string, cb: (err?: Error, isMatch?: boolean) => void) => void
}
