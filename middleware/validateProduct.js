// middleware/validateProduct.js - Product Validation
function validateProduct(req, res, next) {
  const { name, price, category } = req.body;

  if (!name || typeof price !== 'number' || !category) {
    const error = new Error('Invalid product data: name, price, and category are required');
    error.status = 400;
    return next(error);
  }

  next();
}

module.exports = { validateProduct };
