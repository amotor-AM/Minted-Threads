import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  men: {
    s: { type: Number, default: 0 },
    m: { type: Number, default: 0 },
    l: { type: Number, default: 0 },
    xl: { type: Number, default: 0 },
    xxl: { type: Number, default: 0 },
  },
  women: {
    s: { type: Number, default: 0 },
    m: { type: Number, default: 0 },
    l: { type: Number, default: 0 },
    xl: { type: Number, default: 0 },
    xxl: { type: Number, default: 0 },
  },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    creator: { type: String, required: true },
    categories: { type: Array, required: true, default: [] },
    description: { type: String, required: true },
    collection: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviews: { type: Array, required: true, default: [] },
    inventory: {
      type: inventorySchema,
      required: true,
      default: { men: {}, women: {} },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
