import { Request as ExpressRequest } from 'express'

declare module 'express' {
  interface Request extends ExpressRequest {
    id: string
    decoded: {
      _id: string
      confirmed: boolean
      payment: boolean
      isActivateMailToken?: boolean
      isRecoverMailToken?: boolean
    }
  }
}
