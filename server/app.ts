import express, { type Request, type Response, NextFunction } from 'express'
import compression from 'compression'
import router from './router'

const app = express()

app.use(compression())
app.use(express.json())

app.use('/api', router)

// eslint-disable-next-line
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: 'Not found' })
})

export default app
