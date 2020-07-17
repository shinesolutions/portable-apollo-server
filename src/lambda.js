const { ApolloServer } = require("apollo-server-lambda");
const { createConfig } = require("./config");

const server = new ApolloServer(createConfig(process.env));

exports.handler = server.createHandler();
