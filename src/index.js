const { ApolloServer } = require("apollo-server");

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

server.listen().then(() => console.log("Ready!"));
