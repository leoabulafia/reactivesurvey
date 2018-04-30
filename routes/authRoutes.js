const passport = require('passport');

module.exports = app => {
  //check current user
  app.get('/api/currentuser', (req, res) => res.send(req.user));

  //logout
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // When user logins, go to /auth/google
  // or /auth/facebook and into the oauth flow
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email']
    })
  );

  //manages the callback set in GoogleStrategy and FacebookStrategy
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => res.redirect('/dashboard')
  );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => res.redirect('/dashboard')
  );

  //local signup form submitted via POST
  app.post(
    '/auth/local',
    passport.authenticate('local-signup', {
      successRedirect: '/auth/local/callback',
      failureRedirect: '/auth/local/failure'
    })
  );

  app.get('/auth/local/callback', (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });
  app.get('/auth/local/failure', (req, res) => {
    console.log('something happened');
    res.send(false);
  });

  //local login form submitted via post
  app.post(
    '/auth/login',
    passport.authenticate('local-login', {
      successRedirect: '/auth/local/callback',
      failureRedirect: '/auth/local/failure'
    })
  );

  //recover password
  app.post(
    '/auth/recover',
    passport.authenticate('local-recover', {
      successRedirect: '/auth/local/callback',
      failureRedirect: '/auth/local/failure'
    })
  );
};
