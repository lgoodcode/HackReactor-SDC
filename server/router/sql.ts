import { Router } from 'express'
import {
  getProducts,
  getProductsDetails,
  getProductsStyles,
  getRelatedProducts,
} from '@/controllers/sql'

const router = Router()

router
  .get('/products', getProducts)
  .get('/products/:id', getProductsDetails)
  .get('/products/:id/styles', getProductsStyles)
  .get('/products/:id/related', getRelatedProducts)

export default router
