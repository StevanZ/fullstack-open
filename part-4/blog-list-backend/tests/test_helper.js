const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'All 4 JavaScript Scopes Explained',
    author: 'Web Dev Simplified',
    url: 'https://blog.webdevsimplified.com/2022-10/js-scoping/',
    likes: 34
  },
  {
    title: 'Build a React Native speech-to-text dictation app',
    author: 'Log Rocket',
    url: 'https://blog.logrocket.com/build-react-native-speech-to-text-dictation-app/',
    likes: 12
  }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'To be removed',
    author: 'Stevan',
    url: 'https://blog.logrocket.com/build-react-native-speech-to-text-dictation-app/',
    likes: 0
  });

  blog.save();
  blog.remove();

  return blog._id.toString();
};

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId
};
