import jwt from 'jsonwebtoken'

import { X_AUTH_TOKEN_EXPIRES_IN } from 'shared/utils/index'

export const getFreshAuthToken = (userId: string) =>
  jwt.sign({ _id: userId }, process.env.AUTH_SECRET, {
    expiresIn: X_AUTH_TOKEN_EXPIRES_IN,
  })
