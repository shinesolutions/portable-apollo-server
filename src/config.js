exports.config = {
  typeDefs: `
    type Query {
      helloWorld: String!
    }
  `,
  resolvers: {
    Query: {
      helloWorld: () => "Hello World!",
    },
  },
};
