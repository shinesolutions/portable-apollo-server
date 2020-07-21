const { ApolloServer } = require("apollo-server");
const { createConfig } = require("./config");
const env = require("./env.json");

const server = new ApolloServer(createConfig(env));

server.listen().then(() => console.log("Ready!"));
