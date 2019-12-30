const { pool } = require('../Model/database-pool');

// default => GET
exports.getProductsList = (request, response, next) => {
    pool.query('SELECT * FROM books', (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows);
      response.status(200).render('client/products-list.ejs', {prods: results.rows, path: '/'})
    })
};