import { Document } from 'mongoose'
import { NextFunction } from 'express'
import { IUser } from 'shared/utils/index'

interface IUserExtended extends IUser, Document {
  hashPassword: (next: NextFunction) => void
  comparePasswords: (current: string, cb: (err?: Error, isMatch?: boolean) => void) => void
}

export default IUserExtended
