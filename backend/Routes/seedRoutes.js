import express from 'express';
import sampleData from '../data.js';
import Product from '../Models/Product.js';
import User from '../Models/User.js';

const seedRouter = express.Router();

seedRouter.get('/products', async (req, res) => {
  try {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(sampleData.products);
    res.status(201).json(createdProducts);
  } catch (error) {
    console.error('Error seeding data:', error);
    res.status(500).json({ message: 'Failed to seed data' });
  }
});

seedRouter.get('/users', async (req, res) => {
  try {
    await User.deleteMany({});
    const createdUsers = await User.insertMany(sampleData.users);
    res.status(201).json(createdUsers);
  } catch (error) {
    console.error('Error seeding data:', error);
    res.status(500).json({ message: 'Failed to seed data' });
  }
});

export default seedRouter;
