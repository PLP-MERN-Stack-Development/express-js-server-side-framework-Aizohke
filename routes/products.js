// routes/products.js - Product Routes

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { authenticate } = require('../middleware/auth');
const { validateProduct } = require('../middleware/validateProduct');

const router = express.Router();

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Apply authentication to all product routes
router.use(authenticate);

// GET /api/products - List all products (supports filtering & pagination)
router.get('/', (req, res) => {
  let filtered = products;

  // Filtering
  if (req.query.category) {
    filtered = filtered.filter(p => p.category === req.query.category);
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  res.json({
    page,
    total: filtered.length,
    results: paginated
  });
});

// GET /api/products/:id - Get specific product
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    return next(error);
  }
  res.json(product);
});

// POST /api/products - Create new product
router.post('/', validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update existing product
router.put('/:id', validateProduct, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    const error = new Error('Product not found');
    error.status = 404;
    return next(error);
  }
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE /api/products/:id - Delete a product
router.delete('/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    const error = new Error('Product not found');
    error.status = 404;
    return next(error);
  }
  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', deleted });
});

// GET /api/products/search?name=
router.get('/search', (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: 'Name query required' });
  const results = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  res.json(results);
});

// GET /api/products/stats
router.get('/stats', (req, res) => {
  const stats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  res.json(stats);
});

module.exports = router;
