const router = require('express').Router();
const { Blog , Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Update Blog
router.put('/:id', withAuth, async (req, res) => {
  try {

    const updatedBlog = await Blog.update(
        {
        
        title: req.body.title,
        description: req.body.description, 
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

    res.status(200).json(updatedBlog);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Blog
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedBlog = await Blog.destroy({ where: { id: req.params.id } });

    if (!deletedBlog) {
      res.status(404).json({ message: 'No Blogs found' });
      return;
    }
    res.status(200).json(deletedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Add Comment to Blog
router.post('/:id/comment', withAuth,  async (req, res) => {
  
  try{

    const newComment = await Comment.create({
      name: req.session.user_name,
      description: req.body.description,
      date: req.body.fullDate,
      blog_id: req.body.blog_id,

    })

    return res.json(newComment);


  } catch (err) {
    res.status(400).json(err);
  }
})



  module.exports = router;