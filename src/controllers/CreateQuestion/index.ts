import { Application, Request, Response } from 'express'

export default (app: Application) =>
  app.post('/question', (req: Request, res: Response) => {
    console.log(req.body)
    res.status(201).send('created !')
  })
