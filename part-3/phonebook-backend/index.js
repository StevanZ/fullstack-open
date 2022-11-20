require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Person = require('./models/person');
var morgan = require('morgan');
const app = express();
app.use(cors());
app.use(express.static('build'));

// const requestLogger = (request, response, next) => {
//   console.log('Method: ', request.method);
//   console.log('Path: ', request.path);
//   console.log('Body: ', request.body);
//   console.log('---');
//   next();
// };

app.use(express.json());
// app.use(requestLogger);
app.use(
  morgan(':method :url :status :res[content-length] :body - :response-time ms')
);

morgan.token('body', function (req) {
  return JSON.stringify(req.body);
});

const baseUrl = '/api/persons';

app.get(baseUrl, (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get(`${baseUrl}/info`, (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.send(`<p>Phonebook has info for   ${
        persons.length
      }        people</p>
                     <p>${new Date()}</p>  
`);
    })
    .catch((err) => {
      next(err);
    });
});

app.get(`${baseUrl}/:id`, (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete(`${baseUrl}/:id`, (request, response) => {
  const id = request.params.id;
  Person.findByIdAndRemove(id)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
  response.status(204).end();
});

app.post(baseUrl, (request, response, next) => {
  const body = request.body;

  const newPerson = new Person({
    name: body.name,
    number: body.number
  });

  // if (!body.number || !body.name) {
  //   return response.status(400).json({
  //     error: 'Name or number is missing!'
  //   });
  // }

  // const existingContact = Person.findOne({ name: newPerson.name });

  // if (!existingContact) {
  //   return response.status(400).json({
  //     error: 'Name is already in phonebook'
  //   });
  // }

  newPerson
    .save()
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      next(error);
    });
});

app.put(`${baseUrl}/:id`, (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  const newPerson = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(id, newPerson, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .then((result) => {
      response.json(result);
    })
    .catch((err) => {
      next(err);
    });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandling = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    response.status(400).send({
      error: 'malformated id!'
    });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandling);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT} port`);
});
