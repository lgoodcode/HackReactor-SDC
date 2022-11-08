import { Pool } from 'pg'

const isDev = process.env.NODE_ENV !== 'production'
// Reads the environment variables for connection information
const db = new Pool({
  host: isDev ? 'localhost' : process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: isDev ? 5432 : Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})
const PAGE = 1
const COUNT = 5

export const products = async (page = PAGE, count = COUNT) => {
  const offset = (page - 1) * count

  const products = await db.query(`SELECT * FROM products OFFSET ${offset} LIMIT ${count}`)
  return products.rows
}

export const productsDetails = async (id: number) => {
  const product = await db.query(`SELECT * FROM products WHERE id = ${id}`)

  if (!product.rows[0]) return null

  const features = await db.query(`SELECT feature, value FROM features WHERE product_id = ${id}`)

  return {
    ...product.rows[0],
    features: features.rows,
  }
}

export const productsStyles = async (id: number) => {
  const styles = await db.query(`SELECT * FROM styles WHERE "productId" = ${id}`)

  if (!styles.rows.length) return null

  // For some reason these queries need to use quotes around the column names.
  // This is why underscore_case is used for the column names and not camelCase.
  const photos = await Promise.all(
    styles.rows.map(async (style) => {
      const result = await db.query(
        `SELECT "url", "thumbnail_url" FROM photos WHERE "styleId" = ${style.id}`
      )
      return result.rows
    })
  )

  const skus = await Promise.all(
    styles.rows.map(async (style) => {
      const result = await db.query(
        `SELECT "id", "size", "quantity" FROM skus WHERE "styleId" = ${style.id}`
      )
      return result.rows
    })
  )

  return styles.rows.map((style, i) => ({
    style_id: style.id,
    name: style.name,
    original_price: style.original_price,
    sale_price: style.sale_price !== 'null' ? style.sale_price : '0',
    'default?': Boolean(style.default_style),
    photos: photos[i],
    skus: skus[i].reduce(
      (acc, { id, size, quantity }) => ({
        ...acc,
        [id]: { size, quantity },
      }),
      {}
    ),
  }))
}

export const productsRelated = async (id: number) => {
  const related = await db.query(
    `SELECT related_product_id FROM related WHERE current_product_id = ${id}`
  )

  return related.rows.map((product) => product.related_product_id)
}
