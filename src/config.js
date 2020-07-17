const { GraphQLDateTime } = require("graphql-iso-date");

exports.config = {
  typeDefs: `
    scalar DateTime

    type Query {
      helloWorld: String!
      epoch: DateTime!
    }
  `,
  resolvers: {
    DateTime: GraphQLDateTime,
    Query: {
      helloWorld: () => "Hello World!",
      epoch: () => new Date(0),
    },
  },
};
