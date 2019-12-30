const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine','ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop');
const errorRoute = require('./routes/404')


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoute);

app.listen(3000, () => {
    console.log('Server listening ...')
});
