declare namespace Express {
  export interface Request {
    decoded: {
      _id: string
    }
  }
}
