import express from 'express';
import Product from '../Models/Product.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.send({ error: err.message });
  }
});

productRouter.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  } catch (err) {
    res.send({ error: err.message });
  }
});

productRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  } catch (err) {
    res.send(err.message);
  }
});

export default productRouter;
