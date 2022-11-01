import { Router } from 'express'
import { getProducts } from './controllers/products'

const router = Router()

export default router.get('/products', getProducts)
