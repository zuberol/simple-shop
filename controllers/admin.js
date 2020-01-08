const { pool } = require('../Model/database-pool');

// /add-product => POST
exports.postProducts = (request, response) => {
  const { author, title, price, description, url, category } = request.body;
  const seller_id = request.session.email;
  pool.query('INSERT INTO books (author, title, price, description, url, category_id, seller_id) VALUES ($1, $2, $3, $4, $5, $6, (SELECT id FROM users WHERE login=($7)))', [author, title, price, description, url, category, seller_id], error => {
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

// /products => GET
exports.getAdminProducts = (request, response, next) => {
  admin_email = request.session.email;
  pool.query('SELECT * FROM books WHERE seller_id=any(SELECT id FROM users WHERE login=($1))', [admin_email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).render('client/products-list.ejs', {
      prods: results.rows,
      path: '/admin/products',
      pageTitle: "Admin products",
      isAuthenticated: request.session.isAuthenticated ? true : false})
  })
};
