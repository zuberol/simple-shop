CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  login VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  description TEXT DEFAULT 'No description',
  price float(8) NOT NULL,
  url VARCHAR(255) DEFAULT '/products-images/no-image.png',
  category_id INT,
  seller_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (seller_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  customer_id INT,
  book_id INT,
  quantity INT DEFAULT 1,
  FOREIGN KEY (customer_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON UPDATE CASCADE ON DELETE CASCADE,
  UNIQUE (customer_id, book_id)
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

INSERT INTO categories (name) VALUES ('Fantasy');
INSERT INTO categories (name) VALUES ('Lektury');
INSERT INTO categories (name) VALUES ('Others');

INSERT INTO users (login, password) VALUES ('user123@wp.pl', 'pswd11');
INSERT INTO users (login, password) VALUES ('harry@gmail.com', 'hello');
INSERT INTO users (login, password) VALUES ('nobody@o2.pl', 'xyz00');

INSERT INTO books (author, title, category_id, price, description, url, seller_id)
VALUES  ('J.K. Rowling', 'Harry Potter', 1, 10.99, 'Potter, where is Potter - Snape said.', '/products-images/book-id-1.png', 1);

INSERT INTO books (author, title, category_id, price, description, url, seller_id)
VALUES  ('Henryk Sienkiewicz', 'Krzyzacy', 2, 10.99, 'Jurand ze Spychowa to kozak.', '/products-images/book-id-2.jpeg', 2);

INSERT INTO books (author, title, category_id, price, description, url, seller_id)
VALUES  ('Adam Mickiewicz', 'Pan Tadeusz', 2, 9.99, 'Ostatni zajazd na Litwie', '/products-images/book-id-3.jpg', 3);
