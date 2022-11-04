import { config as dotenv } from 'dotenv'
import { Client } from 'pg'

dotenv()

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

const db = new Client({
  connectionString: process.env.DATABASE_URL,
})

const PAGE = 1
const COUNT = 5

export const products = async (page = 1, count = 5, limit?: number) => {
  limit = limit || (page || PAGE) * (count || COUNT)

  console.log(limit)

  const products = await db.query(`SELECT * FROM products LIMIT ${limit}`)
  return products
  // const styles = await Promise.all(
  //   products.rows.map(async (product: any) => {
  //     const results = await db.query(`SELECT * FROM styles WHERE product_id = ${product.id}`)
  //     return results.rows
  //   })
  // )
  // const photos = await Promise.all(
  //   styles.map(async (style: any) => {
  //     const results = await db.query(`SELECT * FROM photos WHERE style_id = ${style.id}`)
  //     return results.rows
  //   })
  // )
  // const skus = await Promise.all(
  //   styles.map(async (style: any) => {
  //     const results = await db.query(`SELECT * FROM sku WHERE style_id = ${style.id}`)
  //     return results.rows
  //   })
  // )

  // return {
  //   products,
  //   styles,
  //   photos,
  //   skus,
  // }

  // return await db.query(`
  // SELECT S.*, P.url, P.thumbnail_url, SK.size, SK.quantity
  // FROM style AS S
  // LEFT JOIN photo as P
  // ON S.id = P.style_id
  // LEFT JOIN sku AS SK
  // ON S.id = SK.style_id
  // GROUP BY S.id, P.url, P.thumbnail_url, SK.size, SK.quantity
  // LIMIT ${limit}
  // `)
}

export const getProductsDetails = async (req: Request) => {
  const { params } = req
  const { id } = params

  return await db.query(`SELECT * FROM products WHERE id = ${id}`)
}

export const getProductStyles = async (req: Request) => {
  const { params } = req
  const { id } = params

  return await db.query(`SELECT * FROM styles WHERE product_id = ${id}`)
}
