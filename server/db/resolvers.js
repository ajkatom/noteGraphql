const Note = require('./models/note').default;
const mongoose = require('mongoose');

export const resolvers = {
  Query: {
    getNote: async (root, { id }) => await Note.findById(id),
    allNotes: async () => await Note.find(),
  },
  Mutation: {
    createNote: async (root, { input }) => await Note.create(input),
    updateNote: async (root, { id, input }) =>
      await Note.findByIdAndUpdate(id, input, { new: true }),
    deleteNote: async (root, { id }) => await Note.findByIdAndRemove(id),
  },
};
