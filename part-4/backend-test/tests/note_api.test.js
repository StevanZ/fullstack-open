const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Note = require('../models/note');
const { initialNotes, notesInDb } = require('./test_helper');

const api = supertest(app);

// jest method beforeEach
beforeEach(async () => {
  await Note.deleteMany({});
  const notesObjects = initialNotes.map((note) => new Note(note));
  const promiseArray = notesObjects.map((note) => note.save());
  await Promise.all(promiseArray);
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('there is two notes', async () => {
  const response = await api.get('/api/notes');
  expect(response.body).toHaveLength(initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes');

  const contents = response.body.map((resp) => resp.content);

  expect(contents).toContain('Browser can execute only Javascript');
});

test('when adding new note', async () => {
  const note = {
    content: 'Jedi govna',
    important: true
  };

  await api
    .post('/api/notes')
    .send(note)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const notesAtEnd = await notesInDb();
  expect(notesAtEnd).toHaveLength(initialNotes.length + 1);

  const contents = notesAtEnd.map((n) => n.content);
  expect(contents).toContain('Jedi govna');
});

test('note without content is not added', async () => {
  const newNote = {
    important: true
  };

  await api.post('/api/notes').send(newNote).expect(400);
  const notesAtEnd = await notesInDb();
  expect(notesAtEnd).toHaveLength(initialNotes.length);
});

test('a specific note can be viewed', async () => {
  // get notes from data base
  const notesAtStart = await notesInDb();
  const noteToView = notesAtStart[0];

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const processedNoteToView = JSON.parse(JSON.stringify(noteToView));
  expect(resultNote.body).toEqual(processedNoteToView);
});

test('a note can be deleted', async () => {
  const notesAtStart = await notesInDb();
  const noteToDelete = notesAtStart[0];

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

  const notesAtEnd = await notesInDb();
  expect(notesAtEnd).toHaveLength(initialNotes.length - 1);

  const contents = notesAtEnd.map((n) => n.content);
  expect(contents).not.toContain(noteToDelete.content);
});

afterAll(() => {
  mongoose.connection.close();
});
