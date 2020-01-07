DROP TABLE cart CASCADE;
DROP TABLE books CASCADE;
DROP TABLE users CASCADE;
DROP TABLE categories CASCADE;
DROP INDEX "IDX_session_expire" CASCADE;
DROP TABLE "sessions" CASCADE;


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

/* Categories */
INSERT INTO categories (name) VALUES ('Children Book'); /* 1 */
INSERT INTO categories (name) VALUES ('Crime & Thriller');  /* 2 */
INSERT INTO categories (name) VALUES ('Education'); /* 3 */
INSERT INTO categories (name) VALUES ('Food & Drink');  /* 4 */
INSERT INTO categories (name) VALUES ('Health');    /* 5 */
INSERT INTO categories (name) VALUES ('History');   /* 6 */
INSERT INTO categories (name) VALUES ('Horror');    /* 7 */
INSERT INTO categories (name) VALUES ('Others');    /* 8 */
INSERT INTO categories (name) VALUES ('Poetry');    /* 9 */
INSERT INTO categories (name) VALUES ('Romance');   /* 10 */
INSERT INTO categories (name) VALUES ('Science Fiction & Fantasy'); /* 11 */
INSERT INTO categories (name) VALUES ('Sport'); /* 12 */


/* Users */
INSERT INTO users (login, password) VALUES ('user123@wp.pl', 'pswd11');   /* 1 */
INSERT INTO users (login, password) VALUES ('harry2@gmail.com', 'hello.world'); /* 2 */
INSERT INTO users (login, password) VALUES ('nobody@o2.pl', 'xyz00'); /* 3 */
INSERT INTO users (login, password) VALUES ('jane-p@interia.pl', 'qwerty'); /* 4 */
INSERT INTO users (login, password) VALUES ('mrrobot@gmail.com', 'ls-al'); /* 5 */


/* Books */

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('Emily Winfield Martin', 'The Wonderful Things You Will Be', 'The New York Times bestseller that celebrates the dreams, acceptance, and love that parents have for their children . . . now and forever!', 13.99, '/products-images/book-id-1.jpg', 1, 1);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('Rod Campbell', 'Dear Zoo : A Lift-the-flap Book', 'Rod Campbell''s classic lift-the-flap book Dear Zoo has been a firm favorite with toddlers and parents alike ever since it was first published in 1982. Young readers love lifting the flaps to discover the animals the zoo has sent--a monkey, a lion, and even an elephant! But will they ever find the perfect pet? With bright, bold artwork, a catchy refrain, and a whole host of favorite animals, Dear Zoo is a must for every child''s bookshelf.', 7.53, '/products-images/book-id-2.jpg', 1, 1);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('James Patterson', 'The House Next Door', 'Three chilling stories from the world''s bestselling thriller writer', 9.99, '/products-images/book-id-3.jpg', 2, 2);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('Colette McBeth', 'Call Me a Liar', 'A new standalone psychological thriller from Colette McBeth, whose dark, twisty and hugely compelling novels are beloved of writers like Paula Hawkins, Clare Mackintosh and Marian Keyes.', 11, '/products-images/book-id-4.jpg', 1, 1);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('Tom Chatfield', 'Critical Thinking', 'Critical Thinking : Your Guide to Effective Argument, Successful Analysis and Independent Study', 18.59, '/products-images/book-id-5.jpg', 3, 4);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('Anna Jones', 'A Modern Way to Cook', 'Over 150 Quick, Smart and Flavour-Packed Recipes for Every Day', 25.25, '/products-images/book-id-6.jpg', 4, 1);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('Eckhart Tolle', 'The Power of Now', 'The bestselling self-help book of its generation - which has now sold over a million copies in the UK alone. Eckhart Tolle demonstrates how to live a healthier and happier life by living in the present moment.', 13.55, '/products-images/book-id-7.jpg', 5, 5);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('Anthony King', 'Command', 'In the wake of the troubled campaigns in Afghanistan and Iraq, military decision-making appears to be in crisis and generals have been subjected to intense and sustained public criticism. Taking these interventions as a starting point, Anthony King examines the transformation of military command in the twenty-first century. Focusing on the army division, King argues that a phenomenon of collective command is developing. In the twentieth century, generals typically directed and led operations personally, monopolising decision-making. They commanded individualistically, even heroically. As operations have expanded in range and scope, decision-making has multiplied and diversified. As a result command is becoming increasingly professionalised and collaborative. Through interviews with many leading generals and vivid ethnographic analysis of divisional headquarters, this book provides a unique insight into the transformation of command in western armies.', 23.75, '/products-images/book-id-8.jpg', 6, 2);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('David Moody', 'Autumn', 'A bastard hybrid of War of the Worlds and Night of the Living Dead, Autumn chronicles the struggle of a small group of survivors forced to contend with a world torn apart by a deadly disease.', 9.99, '/products-images/book-id-9.jpg', 7, 1);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('Stephen King', 'Cujo', 'Once upon a time, not so long ago, a monster came to the small town of Castle Rock, Maine . . . He was not a werewolf, vampire, ghoul, or unnameable creature from the enchanted forest or snow wastes; he was only a cop . . .', 11.55, '/products-images/book-id-10.jpg', 7, 2);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('Rupi Kaur', 'Milk and Honey', '#1 New York Times bestseller Milk and Honey is a collection of poetry and prose about survival. About the experience of violence, abuse, love, loss, and femininity.', 10, '/products-images/book-id-11.jpg', 9, 3);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('Colleen Hoover', 'Regretting You', 'From #1 New York Times bestselling author of It Ends with Us comes a poignant novel about family, first love, grief, and betrayal that will touch the hearts of both mothers and daughters.', 11.35, '/products-images/book-id-12.jpg', 10, 1);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('Peter Gadol', 'The Stranger Game', 'Intriguing, enigmatic literary thriller'' The Financial Times', 10.99, '/products-images/book-id-13.jpg', 11, 4);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('Joe Brusha', 'Grimm Fairy Tales Age of Camelot', 'Taking over after the death of her mother, Sela, Skye Mathers is the new Guardian of the Nexus. With the help of Shang, her mentor, she is learning the extent of her new powers, and trying to figure out the mystery of her connection to the book of Fairy Tales.', 26.31, '/products-images/book-id-14.jpg', 11, 4);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('Hailey Edwards', 'Rise Against : A Foundling novel', 'Welcome to the ferocious world of The Foundling, set in an bayou town where men are men - except when they are also dragons, kitties with wings, crocodiles and . . . well, Miller.', 12.45, '/products-images/book-id-15.jpg', 11, 5);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('Christoph Biermann', 'Football Hackers : The Science and Art of a Data Revolution', 'The future of football is now.', 13.11, '/products-images/book-id-16.jpg', 12, 2);

INSERT INTO books (author, title, description, price, url, category_id, seller_id)
VALUES  ('Bella Mackie', 'Jog On : How Running Saved My Life', 'Bella''s brilliant love letter to running turns into an extraordinarily brave and frank account of her battle with anxiety. A compassionate and important book', 11.59, '/products-images/book-id-17.jpg', 12, 5);
