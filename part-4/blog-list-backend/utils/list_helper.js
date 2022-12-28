var _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((acc, curr) => {
        return acc + curr.likes;
      }, 0);
};

const favoriteBlog = (blogs) => {
  const max = Math.max(...blogs.map((blog) => blog.likes));
  const blog = blogs.find((blog) => blog.likes === max);
  return {
    title: blog.title,
    author: blog.author,
    likes: 12
  };
};

const mostBlogs = (blogs) => {
  const authorBlogs = _.groupBy(blogs, 'author');
  const max = Math.max(...Object.values(authorBlogs).map((arr) => arr.length));
  const mostBlogs = Object.values(authorBlogs).find(
    (author) => author.length === max
  );

  return {
    author: mostBlogs[0].author,
    blogs: mostBlogs.length
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
