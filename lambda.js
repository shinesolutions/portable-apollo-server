const { ApolloServer } = require("apollo-server-lambda");

const server = new ApolloServer({
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
});

exports.handler = server.createHandler();
