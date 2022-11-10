import express, { Express, Request, Response } from 'express'
import { json } from 'body-parser'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
app.use(json())

const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`⚡️Server is running on port: http://localhost:${port}`)
})
