const { ApolloServer } = require("apollo-server");
const { createConfig } = require("./config");
const env = require("./env.json");

const server = new ApolloServer(
  createConfig(env, (integrationContext, headerName) =>
    integrationContext.req.header(headerName)
  )
);

server.listen().then(() => console.log("Ready!"));
