const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine','ejs');
app.set('views', 'views');

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pgPool = require('./Model/database-pool').pool;

app.use(session({
  store: new pgSession({
    pool : pgPool,                // Connection pool
    tableName : 'session'   
  }),
  secret:"my dummy secret",
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoute = require('./routes/404');
const authRoutes = require('./routes/auth');


app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoute);

const listeningPort = 3000;

app.listen(listeningPort, () => {
    console.log(`Server listening on port ${listeningPort}`)
});
