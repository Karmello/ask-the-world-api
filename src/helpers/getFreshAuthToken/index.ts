import jwt from 'jsonwebtoken'

import { X_AUTH_TOKEN_EXPIRES_IN, IUser } from 'atw-shared/utils/index'

export default (
  user: IUser,
  isActivateMailToken?: boolean,
  isRecoverMailToken?: boolean
): string => {
  const token = jwt.sign(
    {
      _id: user._id,
      confirmed: user.config.confirmed,
      payment: Boolean(user.config.payment),
      isActivateMailToken,
      isRecoverMailToken,
    },
    process.env.AUTH_SECRET,
    {
      expiresIn: X_AUTH_TOKEN_EXPIRES_IN,
    }
  )

  return token
}
