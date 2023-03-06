// if the user isnt logged in, redirect them to the login route.
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    // if not logged in, redirect them to the next middleware or next function in the execution sequence.
    next();
  }
};

module.exports = withAuth;