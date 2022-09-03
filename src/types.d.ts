import { Request as ExpressRequest } from 'express'

declare module 'express' {
  interface Request extends ExpressRequest {
    decoded: {
      _id: string
      confirmed: boolean
      isMailToken?: boolean
    }
  }
}
