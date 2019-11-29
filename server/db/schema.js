const { makeExecutableSchema } = require('graphql-tools');
const { resolvers } = require('./resolvers');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/notetaking_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const typeDefs = `
  type Note {
    id: ID!
    title: String!
    date: Date
    content: String!
  }
  scalar Date
  
  type Query {
    getNote(id:ID): Note
    allNotes: [Note]
  }

  input NoteInput {
    title: String!
    content: String!
  }

  input updateNoteInput {
    title: String!
    content: String!
  }


  type Mutation {
    createNote(input: NoteInput):Note
    updateNote(id:ID! , input:updateNoteInput):Note
    deleteNote(id:ID):Note
  }
`;
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
