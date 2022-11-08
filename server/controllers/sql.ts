import { products, productsDetails, productsRelated, productsStyles } from '@/models/sql'
import handleQuery from '@/utils/handleQuery'

export const getProducts = (req: Request, res: Response) => {
  const { query } = req
  const { page, count } = query

  handleQuery(res, products, page, count)
}

export const getProductsDetails = (req: Request, res: Response) => {
  const { params } = req
  const { id } = params

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid id' })
  }

  handleQuery(res, productsDetails, id)
}

export const getProductsStyles = (req: Request, res: Response) => {
  const { params } = req
  const { id } = params

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid id' })
  }

  handleQuery(res, productsStyles, id)
}

export const getRelatedProducts = (req: Request, res: Response) => {
  const { params } = req
  const { id } = params

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'Invalid id' })
  }

  handleQuery(res, productsRelated, id)
}

export default {
  getProducts,
  getProductsDetails,
  getProductsStyles,
  getRelatedProducts,
}
