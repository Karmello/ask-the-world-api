import { Request } from 'express'

declare module 'express' {
  interface Request extends Request {
    decoded: {
      _id: string
      isMailToken?: boolean
    }
  }
}
