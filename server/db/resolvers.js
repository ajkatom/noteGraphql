const Note = require('./models/note').default;

export const resolvers = {
  Query: {
    getNote: async (root, { id }) => await Note.findById(id),
    allNotes: async () => await Note.find(),
  },
  Mutation: {
    createNote: async (root, { input }) => await Note.create(input),
    updateNote: async (root, { id, input }) =>
      await Note.findByIdAndUpdate({ id }, input, { new: true }),
  },
};
