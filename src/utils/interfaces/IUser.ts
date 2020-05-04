import { Document } from 'mongoose'
import { IUser } from 'shared/utils/index'

interface IUserExtended extends IUser, Document {}

export default IUserExtended
