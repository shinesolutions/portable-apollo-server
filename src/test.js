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
  // Start server on ephemeral port
  serverInfo = await apolloServer.listen({ port: 0 });
});

test("helloWorld", async () => {
  const data = await request(serverInfo.url, `{ helloWorld }`);
  expect(data.helloWorld).toEqual("Hello World!");
});

afterAll((done) => {
  serverInfo.server.close(done);
});
