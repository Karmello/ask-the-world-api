import jwt from 'jsonwebtoken'

import { X_AUTH_TOKEN_EXPIRES_IN } from 'shared/utils/index'
import { IUserDoc } from 'utils/index'

export default (user: IUserDoc, isMailToken?: boolean) =>
  jwt.sign({ _id: user._id, isMailToken }, process.env.AUTH_SECRET, {
    expiresIn: X_AUTH_TOKEN_EXPIRES_IN,
  })
