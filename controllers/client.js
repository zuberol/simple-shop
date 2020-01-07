const { pool } = require('../Model/database-pool');

// default => GET
exports.getProductsList = (request, response, next) => {
    pool.query('SELECT * FROM books', (error, results) => {
      if (error) {
        throw error
      }
      //console.log(request.session.isAuthenticated);
      response.status(200).render('client/products-list.ejs', {prods: results.rows, path: '/', pageTitle:"Products list",isAuthenticated: request.session.isAuthenticated ? true : false})
    })
};

// product details => GET
exports.getProductDetails = (request, response, next) => {
  const book_id = request.query.bookid;
  if (book_id){
    pool.query('SELECT * FROM books WHERE id=($1)', [book_id], (error, results) => {
      if (error) {
        throw error
      }
      //console.log(results.rows);
      response.status(200).render('client/details.ejs', {prods: results.rows, path: '/products', pageTitle:"Product details",isAuthenticated: request.session.isAuthenticated ? true : false})
    })
  } else {
    pool.query('SELECT * FROM books', (error, results) => {
      if (error) {
        throw error
      }
      //console.log(results.rows);
      response.status(200).render('client/products-list.ejs', {prods: results.rows, path: '/products', pageTitle:"Products list",isAuthenticated: request.session.isAuthenticated ? true : false})
    })
  }
};

// cart list => GET
// !!!!! customer_id is set to 1
exports.getCartList = (request, response, next) => {
  //const customer_id = request.query.customerid;
  const customer_id = 1;
  pool.query('SELECT * FROM books WHERE id=any(SELECT book_id FROM cart where customer_id=($1))', [customer_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).render('client/cart.ejs', {prods: results.rows, path: '/cart', pageTitle: "Cart",isAuthenticated: request.session.isAuthenticated ? true : false})
  })
};

// add-to-cart => POST
// !!!!! customer_id is set to 1
// TODO: quantity
exports.addToCart = (request, response) => {
  //const customer_id = request.query.customerid;
  const customer_id = 1;
  const book_id = request.query.bookid;
  pool.query('INSERT INTO cart (customer_id, book_id, quantity) VALUES ($1, $2, $3)', [customer_id, book_id, 1], error => {
    if (error) {
      throw error
    }
    response.redirect('/cart');  // customerid is set to 1 !!!
    //console.log("Product added to cart.")
  })
};

// delete-from-cart => POST 
// !!!!! customer_id is set to 1
exports.deleteFromCart = (request, response) => {
  //const customer_id = request.query.customerid;
  const customer_id = 1;
  const book_id = request.query.bookid;
  pool.query('DELETE FROM cart WHERE customer_id=($1) and book_id=($2)', [customer_id, book_id], error => {
    if (error) {
      throw error
    }
    response.redirect('/cart');
    //console.log("Product deleted from cart.")
  })
};