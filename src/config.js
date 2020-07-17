const { GraphQLDateTime } = require("graphql-iso-date");
const { HelloWorldDataSource } = require("./HelloWorldDataSource");

exports.createConfig = function (env) {
  return {
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
        helloWorld: (source, args, context) =>
          context.dataSources.helloWorld.getMessage(),
        epoch: () => new Date(0),
      },
    },
    dataSources: () => ({
      helloWorld: new HelloWorldDataSource(env.helloWorldUrl),
    }),
  };
};
