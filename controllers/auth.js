const { pool } = require('../Model/database-pool');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isAuthenticated ? true : false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  req.session.email = req.body.email;
  req.session.password = req.body.password;
  req.session.isAuthenticated = true;

  req.session.save(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.postSignup = (req, res, next) => {
  if(req.body.password !== req.body.confirmPassword){
    console.log('password != confirmPassword')
    return res.redirect('/')
  }
  
  const findUser = 'SELECT * FROM users WHERE login=($1)';
  const values1 = [req.body.email]

  const insertUser = 'INSERT INTO users(login, password) VALUES($1, $2) RETURNING *'
  const values2 = [req.body.email, req.body.password]

  pool
  .query(findUser, values1)
  .then(user_params => {
    if(user_params.rowCount===0){
      pool
      .query(insertUser,values2)
      .then(response => {
        res.redirect('/');
      })
      .catch(error => {
        console.log(error)
        res.redirect('/')
      });
    }
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    //console.log(req.session);
    console.log(err);
    res.redirect('/');
  });
};
