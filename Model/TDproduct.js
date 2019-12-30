const pool = require('./database-pool');

//const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    //return pool.query(
      //'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
     // [this.title, this.price, this.imageUrl, this.description]
    //);
  }

  static deleteById(id) {}

  static fetchAll() {
    return pool.query('SELECT * FROM books');
  }

  static findById(id) {
    //return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};