const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      item: { type: String, required: true },
      qty: { type: Number, required: true },
      size: { type: String, required: true },
      price: { type: Number, required: true },
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
  orderId: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  shippingAddress: {
    street: { type: String, required: true },
    street2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  billingAddress: {
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
  paymentDate: { type: Date },
  nft: { type: mongoose.Schema.Types.ObjectId, ref: 'NFT' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
