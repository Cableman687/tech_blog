const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
});
  
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
});

module.exports = { Blog , User , Comment };