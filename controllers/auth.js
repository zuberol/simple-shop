const { pool } = require('../Model/database-pool');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isAuthenticated ? true : false,
    isAuthorized: req.session.isAuthorized ? true : false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: req.session.isAuthenticated ? true : false,
    isAuthorized: req.session.isAuthorized ? true : false
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isAuthenticated = false;
  req.session.isAuthorized = false;

  const findUser = 'SELECT * FROM users WHERE login=($1)';
  const values = [req.body.email]

  pool
  .query(findUser, values)
  .then(user_params => {
    if(user_params.rowCount===0){
      res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        alertMessage: 'Wrong login or password. Try again or click Forgot password to reset it.',
        isAuthenticated: req.session.isAuthenticated ? true : false,
        isAuthorized: req.session.isAuthorized ? true : false
      });
    }
    else{
      if(user_params.rows[0].login === req.body.email && user_params.rows[0].password === req.body.password){
        req.session.email = req.body.email;
        req.session.password = req.body.password;
        req.session.isAuthenticated = true;
        req.session.isAuthorized = user_params.rows[0].permissions === 'extended' ? true : false;

        req.session.save(err => {
          console.log(err);
          res.redirect('/');
        });
      }
      else{
        console.log('Wrong password!')
        res.render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          alertMessage: 'Wrong login or password. Try again or click Forgot password to reset it.',
          isAuthenticated: req.session.isAuthenticated ? true : false,
          isAuthorized: req.session.isAuthorized ? true : false
        });
      }
    }
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  });
};

exports.postSignup = (req, res, next) => {
  if(req.body.password !== req.body.confirmPassword){
    return res.render('auth/signup',{
      path: '/signup',
      pageTitle: 'Sign in',
      isAuthenticated: req.session.isAuthenticated ? true : false,
      isAuthorized: req.session.isAuthorized ? true : false,
      alertMessage: 'Your password and confirmation password do not match. Try again.'
    });
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
    else{
      return res.render('auth/signup',{
        path: '/signup',
        pageTitle: 'Sign in',
        isAuthenticated: req.session.isAuthenticated ? true : false,
        isAuthorized: req.session.isAuthorized ? true : false,
        alertMessage: 'Such user already exists in our database. If you don\'t remember your password use Forgot password.'
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
