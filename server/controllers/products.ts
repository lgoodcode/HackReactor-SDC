import { products } from '@/database/models/sql'

export const getProducts = async (req: Request, res: Response) => {
  const { query } = req
  const { page, count } = query
  const results = await products(page, count)
  res.json(results)
}
