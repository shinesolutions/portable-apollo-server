const { ApolloServer } = require("apollo-server");
const { createConfig } = require("./config");

const server = new ApolloServer(
  createConfig({ helloWorldUrl: "http://localhost:8882" })
);

server.listen().then(() => console.log("Ready!"));
