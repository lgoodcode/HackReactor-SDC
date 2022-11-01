import { config as dotenv } from 'dotenv'
import mongoose from 'mongoose'

dotenv()

if (!process.env.DB_NAME) {
  throw new Error('DB_NAME is not defined')
}

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)

const productSchema = new mongoose.Schema({
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
})

const styleSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  sale_price: Number,
  original_price: Number,
  default_style: Boolean,
})

const featureSchema = new mongoose.Schema({
  product_id: Number,
  feature: String,
  value: String,
})

const photo = new mongoose.Schema({
  style_id: Number,
  thumbnail_url: String,
  url: String,
})

const relatedSchema = new mongoose.Schema({
  product_id: Number,
  related_product_ids: [Number],
})

const sku = new mongoose.Schema({
  style_id: Number,
  size: String,
  quantity: Number,
})

const Product = mongoose.model('Product', productSchema)
const Style = mongoose.model('Style', styleSchema)
const Feature = mongoose.model('Feature', featureSchema)
const Photo = mongoose.model('Photo', photo)
const Related = mongoose.model('Related', relatedSchema)
const Sku = mongoose.model('Sku', sku)

export default {
  Product,
  Style,
  Feature,
  Photo,
  Related,
  Sku,
}
