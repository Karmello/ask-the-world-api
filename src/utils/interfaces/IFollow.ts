import { Document } from 'mongoose'
import { IFollow } from 'shared/utils/index'

export interface IFollowDoc extends IFollow, Document {
  _id: any
}
