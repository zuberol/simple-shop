const { pool } = require('../Model/database-pool');

// default => GET
exports.getProductsList = (request, response, next) => {
    pool.query('SELECT * FROM books', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).render('client/products-list.ejs', {
      prods: results.rows,
      path: '/',
      pageTitle:"Products list",
      isAuthenticated: request.session.isAuthenticated ? true : false})
    })
};

// product details => GET
exports.getProductDetails = (request, response, next) => {
  const book_id = request.query.bookid;
  if (book_id){
    pool.query('SELECT b.*, c.name FROM books b, categories c WHERE b.category_id=c.id and b.id=($1)', [book_id], (error, results) => {
      if (error) {
        throw error
      }
      //console.log(results.rows);
      response.status(200).render('client/details.ejs', {
        prods: results.rows,
        path: '/products',
        pageTitle:"Product details",
        isAuthenticated: request.session.isAuthenticated ? true : false})
    })
  } else {
    pool.query('SELECT * FROM books', (error, results) => {
      if (error) {
        throw error
      }
      //console.log(results.rows);
      response.status(200).render('client/products-list.ejs', {
        prods: results.rows,
        path: '/products',
        pageTitle:"Products list",
        isAuthenticated: request.session.isAuthenticated ? true : false})
    })
  }
};

// cart list => GET
exports.getCartList = (request, response, next) => {
  customer_email = request.session.email;
  pool.query('SELECT b.id, b.title, b.url, b.price, c.quantity FROM books b, cart c WHERE b.id=c.book_id and c.customer_id=any(SELECT id FROM users WHERE login=($1))', [customer_email], (error, results) => {
    if (error) {
      throw error
    }
  response.status(200).render('client/cart.ejs', {
    prods: results.rows,
    path: '/cart',
    pageTitle: "Cart",
    isAuthenticated: request.session.isAuthenticated ? true : false})
  })
};

// add-to-cart => POST
exports.addToCart = (request, response) => {
  customer_email = request.session.email;
  const book_id = request.query.bookid;
  const quantity  = request.body.quantity;
  pool.query('INSERT INTO cart (customer_id, book_id, quantity) VALUES ((SELECT id FROM users WHERE login=($1)), $2, $3)', [customer_email, book_id, quantity], error => {
    // if (error) {
    //  throw error
    //}
    response.redirect('/cart');
  })
};

// delete-from-cart => POST 
exports.deleteFromCart = (request, response) => {
  customer_email = request.session.email;
  const book_id = request.query.bookid;
  pool.query('DELETE FROM cart WHERE customer_id=any(SELECT id FROM users WHERE login=($1)) and book_id=($2)', [customer_email, book_id], error => {
    if (error) {
      throw error
    }
    response.redirect('/cart');
  })
};