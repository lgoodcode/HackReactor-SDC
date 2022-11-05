import { products, productsDetails, productsRelated, productsStyles } from '@/database/models/sql'
import handleQuery from '@/utils/handleQuery'

export const getProducts = (req: Request, res: Response) => {
  const { query } = req
  const { page, count } = query

  handleQuery(res, products, page, count)
}

export const getProductsDetails = (req: Request, res: Response) => {
  const { params } = req
  const { id } = params

  handleQuery(res, productsDetails, id)
}

export const getProductsStyles = (req: Request, res: Response) => {
  const { params } = req
  const { id } = params

  handleQuery(res, productsStyles, id)
}

export const getRelatedProducts = (req: Request, res: Response) => {
  const { params } = req
  const { id } = params

  handleQuery(res, productsRelated, id)
}

export default {
  getProducts,
  getProductsDetails,
  getProductsStyles,
  getRelatedProducts,
}
