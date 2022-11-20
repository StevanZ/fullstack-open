const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('Connecting...');

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to mongoDB');
  })
  .catch((err) => {
    console.log('error connecting to mongoDB: ', err.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{3}-\d/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`
    },
    minLength: 8
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
