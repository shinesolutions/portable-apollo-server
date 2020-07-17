const { ApolloServer } = require("apollo-server-lambda");
const { config } = require("./config");

const server = new ApolloServer(config);

exports.handler = server.createHandler();
