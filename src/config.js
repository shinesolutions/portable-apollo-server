const { GraphQLDateTime } = require("graphql-iso-date");
const jwt = require("jsonwebtoken");

const { HelloWorldDataSource } = require("./HelloWorldDataSource");

exports.createConfig = function (env, getHeader) {
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
        helloWorld: async (source, args, context) =>
          `${await context.dataSources.helloWorld.getMessage()}, ${
            context.userName
          }!`,
        epoch: () => new Date(0),
      },
    },
    dataSources: () => ({
      helloWorld: new HelloWorldDataSource(env.helloWorldUrl),
    }),
    context: function (integrationContext) {
      const authHeader = getHeader(integrationContext, "Authorization");
      const payload = jwt.decode(authHeader);

      return {
        userName: payload.name,
      };
    },
  };
};
