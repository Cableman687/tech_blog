const router = require('express').Router();
const { User , Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// localhost/api/users/login
router.post('/login', async (req, res) => {
  try {
    //Find the user who matches the posted email address.
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    //Verify that the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

      //Create session variables using the data from the logged-in user.
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_name = userData.name;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// destroy session when logging out.
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Create a new account
router.post('/signup', async (req, res) => {
  try {
    // //Find the user who matches the posted email address.
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (userData) {
      res
        .status(400)
        .json({ message: 'Account Already Exists!' });
      return;
    }

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })

    return res.json(newUser);



  } catch (err) {
    res.status(400).json(err);
    console.log("Error in userRoutes File!");
  }
});

// Create a New Blog
router.post('/newBlog', withAuth, async (req, res) => {
  try { 

    const newBlog = await Blog.create({
      name: req.session.user_name,
      title: req.body.title,
      description: req.body.description,
      date: req.body.fullDate,
    })

    return res.json(newBlog);


  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;
  