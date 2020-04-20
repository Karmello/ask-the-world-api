import express from 'express'
import { RootController } from 'controllers/index'

require('dotenv').config()

const { NODE_ENV, PORT } = process.env
const app = express()

app.get('^/$', RootController)

if (NODE_ENV !== 'test') {
  app.listen(PORT, (err?) => {
    if (err) return console.log(err)
    console.log(`API listening on port ${PORT}`, { NODE_ENV }, '\n')
  })
}

export default app
