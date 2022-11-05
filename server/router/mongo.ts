import { Router } from 'express'
import {
  getProducts,
  getProductsDetails,
  getProductsStyles,
  getProductsRelated,
} from '@/controllers/mongo'

const router = Router()

router
  .get('/products', getProducts)
  .get('/products/:id', getProductsDetails)
  .get('/products/:id/styles', getProductsStyles)
  .get('/products/:id/related', getProductsRelated)

export default router
