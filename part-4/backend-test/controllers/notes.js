const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.post('/', async (request, response) => {
  const body = request.body;

  // if (!body.content) {
  //   return response.status(400).json({
  //     error: 'content missing'
  //   });
  // }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  });

  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
  const id = request.params.id;

  const note = await Note.findById(id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  await Note.findByIdAndRemove(id);
  response.status(204).end();
});

notesRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const { content, important } = request.body;

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { content, important },
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  );

  response.json(updatedNote);
});

module.exports = notesRouter;
