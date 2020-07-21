const { GraphQLDateTime } = require("graphql-iso-date");
const jwt = require("jsonwebtoken");

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
        helloWorld: async (source, args, context) =>
          `${await context.dataSources.helloWorld.getMessage()}, ${
            context.userName
          }`,
        epoch: () => new Date(0),
      },
    },
    dataSources: () => ({
      helloWorld: new HelloWorldDataSource(env.helloWorldUrl),
    }),
    context: function (integrationContext) {
      const authHeader = integrationContext.req.header("Authorization");
      console.log(authHeader);
      const payload = jwt.decode(authHeader);

      return {
        userName: payload.name,
      };
    },
  };
};
