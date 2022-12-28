const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: String,
  likes: Number
});

blogSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
