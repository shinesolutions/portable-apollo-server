const { promisify } = require("util");
const { ApolloServer } = require("apollo-server");

let httpServer;

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

  httpServer = (await apolloServer.listen({ port: 0 })).server;
});

afterAll(() => {
  return promisify(httpServer.close).bind(httpServer)();
});

test("test", () => {
  expect(1).toBe(1);
});
