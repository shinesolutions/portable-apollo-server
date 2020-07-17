const { promisify } = require("util");
const { ApolloServer } = require("apollo-server");
const { request } = require("graphql-request");

let serverInfo;

beforeAll(async () => {
  const apolloServer = new ApolloServer({
    typeDefs: `
    type Query {
      helloWorld: String!
    }
  `,
    resolvers: {
      Query: {
        helloWorld: () => "Hello World!",
      },
    },
  });

  serverInfo = await apolloServer.listen({ port: 0 });
});

afterAll(() => {
  const { server } = serverInfo;
  return promisify(server.close).bind(server)();
});

test("test", () => {});
