const { ApolloServer } = require("apollo-server-lambda");
const { createConfig } = require("./config");

const server = new ApolloServer(
  createConfig(
    process.env,
    (integrationContext, headerName) =>
      integrationContext.event.headers[headerName]
  )
);

exports.handler = server.createHandler();
