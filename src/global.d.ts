declare module '*.json' {
  const value: any
  export default value
}

declare module Express {
  export interface Request {
    decoded: {
      _id: string
    }
  }
}
