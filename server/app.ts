import express from 'express'
import compression from 'compression'
import sqlRouter from './router/sql'
import mongoRouter from './router/mongo'

const app = express()

app.use(compression())
app.use(express.json())

app.use('/api/mongo', mongoRouter)
app.use('/api', sqlRouter)

// eslint-disable-next-line
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: 'Not found' })
})

export default app
