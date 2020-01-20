const { pool } = require('../Model/database-pool');

// /add-product => POST
exports.postProducts = (request, response) => {
  const { author, title, price, description, url, category } = request.body;
  const seller_id = request.session.email;
  let descr = (description) ? description : 'No description.'; 
  let img = (url) ? url : '/products-images/no-image.png';
  pool.query('INSERT INTO books (author, title, price, description, url, category_id, seller_id) VALUES ($1, $2, $3, $4, $5, $6, (SELECT id FROM users WHERE login=($7)))', [author, title, price, descr, img, category, seller_id], error => {
    //if (error) {
    //  throw error
    //}
    response.redirect('/');
    //console.log("Product added!")
  })
};

// /add-product => GET
exports.getProducts = (req, res, next) => {
  res.render('admin/add-product', {
    path: '/admin/add-product',
    pageTitle:"Admin products list",
    isAuthenticated: req.session.isAuthenticated ? true : false,
    isAuthorized: req.session.isAuthorized ? true : false
    });
};

// /products => GET
exports.getAdminProducts = (request, response, next) => {
  admin_email = request.session.email;
  pool.query('SELECT * FROM books WHERE seller_id=any(SELECT id FROM users WHERE login=($1))', [admin_email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).render('admin/products-list-admin.ejs', {
      prods: results.rows,
      path: '/admin/products',
      pageTitle: "Admin products",
      isAuthenticated: request.session.isAuthenticated ? true : false,
      isAuthorized: request.session.isAuthorized ? true : false
    })
  })
};

// /edit-product => GET
exports.editProduct = (request, response, next) => {
  book_id = request.query.bookid;
  user_email = request.session.email;
  pool.query('SELECT * FROM books WHERE id=($1) and seller_id=any(SELECT id FROM users WHERE login=($2))', [book_id, user_email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).render('admin/edit-product.ejs', {
      prods: results.rows,
      path: '/admin/edit-product',
      pageTitle: "Edit product",
      isAuthenticated: request.session.isAuthenticated ? true : false,
      isAuthorized: request.session.isAuthorized ? true : false
    })
  })
};

// /edit-product => POST
exports.postEditedProduct = (request, response) => {
  const { id, author, title, price, description, url, category } = request.body;
  let descr = (description) ? description : 'No description.'; 
  let img = (url) ? url : '/products-images/no-image.png';
  pool.query('UPDATE books set author=($1), title=($2), price=($3), description=($4), url=($5), category_id=($6) WHERE id=($7)', [author, title, price, descr, img, category, id], error => {
    if (error) {
      throw error
    }
    response.redirect('/admin/products');
  })
};

// /delete-product => POST
exports.deleteProduct = (request, response) => {
  const book_id = request.query.bookid;
  const seller_id = request.session.email;
  pool.query('DELETE FROM books WHERE id=($1) and seller_id=any(SELECT id FROM users WHERE login=($2))', [book_id, seller_id], error => {
    if (error) {
      throw error
    }
    response.redirect('/admin/products');
  })
};
