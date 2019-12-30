CREATE TABLE books (
  ID SERIAL PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  price float(8) NOT NULL,
  description VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL

);

INSERT INTO books (author, title)
VALUES  ('J.K. Rowling', 'Harry Potter', 10.99, 'Potter, where is Potter - Snape said.', 'Model/products-images/book-id-1.png');

INSERT INTO books (author, title)
VALUES  ('Henryk Sienkiewicz', 'Krzyzacy', 10.99, 'Jurand ze Spychowa to kozak.', 'Model/products-images/book-id-2.jpeg');
