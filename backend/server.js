import express from 'express';
import sampleData from './data.js';

const app = express();

app.get('/api/products', (req, res) => {
  res.send(sampleData.products);
});

const port = process.env.PORT || 5023;

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
