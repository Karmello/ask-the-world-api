import { Document } from 'mongoose'
import { IFollow } from 'atw-shared/utils/index'

export interface IFollowDoc extends IFollow, Document {
  _id: string
}
