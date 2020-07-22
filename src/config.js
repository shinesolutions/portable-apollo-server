const jwt = require("jsonwebtoken");

const { HelloWorldDataSource } = require("./HelloWorldDataSource");

exports.createConfig = function (env, getHeader) {
  return {
    typeDefs: `
      type Query {
        helloWorld: String!
      }
    `,
    resolvers: {
      Query: {
        helloWorld: async (source, args, context) =>
          `${await context.dataSources.helloWorld.getMessage()}, ${
            context.userName
          }!`,
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
