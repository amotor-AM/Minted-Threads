import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [
    {
      slug: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      size: { type: String },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  shipped: { type: Boolean, default: false },
  fulfilled: { type: Boolean, default: false },
  received: { type: Date },
  trackingNumber: { type: String },
  shippingAddress: {
    street: { type: String, required: true },
    street2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  },
  itemsPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  taxPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  paymentDate: { type: Date },
  processedDate: { type: Date },
  shippingDate: { type: Date },
  DeliveryDate: { type: Date },
  nft: { type: mongoose.Schema.Types.ObjectId, ref: 'NFT' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
