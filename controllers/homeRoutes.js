const router = require('express').Router();
const { User , Blog , Comment } = require('../models');
const withAuth = require('../utils/auth');


// Show all blogs to homepage, regardless of login status.
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      order: [['id']],
      include: [
        {
          model: Comment,
          attributes: [ 
            'id',
            'name', 
            'description', 
            'date',
            'blog_id',
          ],
        },
      ],
    });

    const blogs = blogData.map((project) => project.get({ plain: true }));
    console.log(blogs);
    res.render('homepage', {
      blogs,
      // pass in the 'logged in' flag to the template.
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// User login page
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage.
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Create a new user account
router.get('/signup', (req, res) => {

  res.render('signUp');

});

// Create a new blog
router.get('/newBlog', withAuth, (req, res) => {

  res.render('newBlog', {
    logged_in: req.session.logged_in,
    user_name: req.session.user_name,
  });
  
});


// Display user dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: { name: req.session.user_name },
      // attributes: { exclude: ['id'] },
      order: [['id']],
    });

    const blogs = blogData.map((project) => project.get({ plain: true }));

    res.render('dashboard', {
      blogs,
      // pass in the 'logged in' flag to the template.
      logged_in: req.session.logged_in,
      // pass in the username of logged in user.
      user_name: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a blog
router.get('/blogs/:id/edit', withAuth, async (req, res) => {

  try {
    
    const blogData = await Blog.findAll({
      where: { id: req.params.id },
    });
    
    const selectedBlog = blogData.map((project) => project.get({ plain: true }));

    console.log(selectedBlog);

    res.render('updateBlog', {
      selectedBlog,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });

  } catch (err) {
    res.status(500).json(err);
  }
  
});

// Add a comment to a blog
router.get('/blogs/:id/comment', withAuth, async (req, res) => {

  console.log(req.params.id);

  try {
    
    const blogData = await Blog.findAll({
      where: { id: req.params.id },
      // attributes: { exclude: ['id'] },
      order: [['id']],
    });
    
    const selectedBlog = blogData.map((project) => project.get({ plain: true }));

    console.log(selectedBlog);

    res.render('commentBlog', {
      selectedBlog,
     
      logged_in: req.session.logged_in,
      
      user_name: req.session.user_name,
    });

  } catch (err) {
    res.status(500).json(err);
  }
  
});


module.exports = router;