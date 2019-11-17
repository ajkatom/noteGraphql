const typeDefs = `
  type Note {
    id: ID!,
    title: String!,
    date: Date,
    Content: String!
  }
  scalar Date
  
  type Query {
    allNotes: [Note]
  }
`;

export default typeDefs;
