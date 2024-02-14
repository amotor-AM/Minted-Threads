import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  street2: { type: String, required: false },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  preferredShiping: { type: Boolean, required: true, default: false },
  preferredBilling: { type: Boolean, required: true, default: false },
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  addresses: {
    type: [addressSchema],
    required: true,
    default: [],
    validate: {
      validator: function (arr) {
        // Validate each address in the array
        return arr.every((addr) => mongoose.Types.ObjectId.isValid(addr._id));
      },
      message: (props) => `${props.value} is not a valid ObjectId!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: { type: String, required: true },
  userType: {
    type: String,
    required: true,
    enum: ['Admin', 'Seller', 'Customer'],
    default: 'Customer',
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

const User = mongoose.model('User', userSchema);

export default User;
