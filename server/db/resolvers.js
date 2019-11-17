const Note = require('./models/note').default;

export const resolvers = {
  Query: {
    getNote : async (root,{id}) => await Note.findById(id),
    allNotes: async () => await Note.find(),
  },
  Mutation: {
    createNote: async (root, { input }) => {
      return await Note.create(input);
    },
  },
};
