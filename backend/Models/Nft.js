import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  from: { type: String },
  to: { type: String },
  date: { type: Date, default: Date.now },
});

const nftSchema = new mongoose.Schema({
  tokenId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  minted: { type: Boolean, default: false },
  storageAddress: { type: String },
  transactionAddress: { type: String },
  released: { type: Boolean, default: false },
  transactionHistory: [transactionSchema],
});

const NFT = mongoose.model('NFT', nftSchema);
export default NFT;
