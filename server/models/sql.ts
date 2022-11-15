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

process.on('SIGTERM', () => {
  db.end()
})

export const products = async (page = PAGE, count = COUNT) => {
  const offset = (page - 1) * count
  const products = await db.query(`SELECT * FROM products OFFSET ${offset} LIMIT ${count}`)
  return products.rows
}

export const productsDetails = async (id: number) => {
  const result = await db.query(`
    SELECT
      P.*,
      jsonb_agg(DISTINCT jsonb_build_object('feature', F.feature, 'value', F.value)) as features
    FROM products AS P
    LEFT JOIN features AS F
    ON P.id = F.product_id
    WHERE P.id = ${id}
    GROUP BY P.id`)

  return !result.rows.length ? null : result.rows[0]
}

export const productsStyles = async (id: number) => {
  const styles = await db.query(`
    SELECT
        S.*,
        jsonb_agg(DISTINCT jsonb_build_object('thumbnail_url', P.thumbnail_url, 'url', P.url)) AS photos,
        jsonb_object_agg(SK.id, to_jsonb(SK) - 'styleId' - 'id') AS skus
    FROM styles AS S
    INNER JOIN photos AS P
    ON S.id = P."styleId"
    INNER JOIN skus AS SK
    ON S.id = SK."styleId"
    WHERE S."productId" = ${id}
    GROUP BY S.id`)

  if (!styles.rows.length) return null

  return styles.rows.map((style) => ({
    style_id: style.id,
    name: style.name,
    original_price: style.original_price,
    sale_price: style.sale_price !== 'null' ? style.sale_price : '0',
    'default?': Boolean(style.default_style),
    photos: style.photos,
    skus: style.skus,
  }))
}

export const productsRelated = async (id: number) => {
  const related = await db.query(
    `SELECT related_product_id FROM related WHERE current_product_id = ${id}`
  )

  return related.rows.map((product) => product.related_product_id)
}
