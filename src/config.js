const { GraphQLDateTime } = require("graphql-iso-date");
const { makeExecutableSchema } = require("apollo-server");

exports.config = {
  schema: makeExecutableSchema({
    inheritResolversFromInterfaces: true,
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
  }),
};
