import mongoose from 'mongoose'

// When running tests in CI, we need to have a mock mongoose object to prevent
// the tests from crashing.
const mongo = (
  process.env.CI !== 'true'
    ? mongoose
    : {
        connect: () => null,
        Schema: class Schema {},
        model: () => null,
      }
) as typeof mongoose

mongo.connect(process.env.MONGODB_URI || '')

process.on('SIGTERM', () => {
  mongo.connection.close()
})

const productSchema = new mongo.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
})

const styleSchema = new mongo.Schema({
  id: {
    type: Number,
    required: true,
  },
  product_id: Number,
  name: String,
  sale_price: String,
  original_price: String,
  default_style: Number,
})

const featureSchema = new mongo.Schema({
  id: {
    type: Number,
    required: true,
  },
  product_id: Number,
  feature: String,
  value: String,
})

const photoSchema = new mongo.Schema({
  id: {
    type: Number,
    required: true,
  },
  styleId: Number,
  thumbnail_url: String,
  url: String,
})

const relatedSchema = new mongo.Schema({
  id: {
    type: Number,
    required: true,
  },
  product_id: Number,
  related_product_id: Number,
})

const skuSchema = new mongo.Schema({
  id: {
    type: Number,
    required: true,
  },
  style_id: Number,
  size: String,
  quantity: Number,
})

const Product = mongo.model('Product', productSchema)
const Style = mongo.model('Style', styleSchema)
const Feature = mongo.model('Feature', featureSchema)
const Photo = mongo.model('Photo', photoSchema)
const Related = mongo.model('Related', relatedSchema)
const Sku = mongo.model('Sku', skuSchema)
const PAGE = 1
const COUNT = 5

export const products = async (page = PAGE, count = COUNT) => {
  const offset = (page - 1) * count

  try {
    return await Product.find().skip(offset).limit(count).select('-_id')
  } catch (err) {
    return err as Error
  }
}

export const productsDetails = async (id: number) => {
  try {
    // Need to specify lean() to get a plain JS object instead of a Mongoose document object
    const product = await Product.findOne({ id }).select('-_id').lean()

    if (!product) return null

    const features = await Feature.find({ product_id: id }).select('-_id feature value')

    return {
      ...product,
      features,
    }
  } catch (err) {
    return err as Error
  }
}

export const productStyles = async (id: number) => {
  try {
    // Need to specify lean() to get a plain JS object instead of a Mongoose document object
    const styles = await Style.find({ product_id: id }).select('-_id').lean()

    if (!styles) return null

    // Need to specify `styleId` because mongo will set the field name based on the
    // header in the CSV file imported. Can't change because all programs crash lol
    const photos = await Promise.all(
      styles.map(
        async (style) =>
          await Photo.find({ styleId: style.id }).select('-_id thumbnail_url url').lean()
      )
    )

    const skus = await Promise.all(
      styles.map(
        async (style) =>
          await Sku.find({ styleId: style.id }).select('-_id id size quantity').lean()
      )
    )

    return styles.map((style, i) => ({
      style_id: style.id,
      name: style.name,
      original_price: style.original_price,
      sale_price: style.sale_price || '0',
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
  } catch (err) {
    return err as Error
  }
}

export const productsRelated = async (id: number) => {
  try {
    const related = await Related.find({ product_id: id }).select('-_id related_product_id')

    if (!related) return null

    return related.map((item) => item.related_product_id)
  } catch (err) {
    return err as Error
  }
}
