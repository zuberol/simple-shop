const { pool } = require('../Model/database-pool');

// /add-product => POST
exports.postProducts = (request, response) => {
  const { author, title, price, description, url } = request.body

  pool.query('INSERT INTO books (author, title, price, description, url) VALUES ($1, $2, $3, $4, $5)', [author, title, price, description, url], error => {
    if (error) {
      throw error
    }
    response.redirect('/');
    //console.log("Product added!")
  })
};

// /add-product => GET
exports.getProducts = (req, res, next) => {
  res.render('admin/add-product', {path: '/admin/add-product',pageTitle:"Admin products list", isAuthenticated: true});
};
