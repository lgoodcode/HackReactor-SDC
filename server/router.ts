import { Router } from 'express'
// import controllers from './controllers'

const router = Router()

export default router.get('*', (req, res) => {
  res.send('hello world')
})
