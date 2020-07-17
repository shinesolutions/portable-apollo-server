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
  // Start server on ephemeral port
  serverInfo = await apolloServer.listen({ port: 0 });
});

afterAll(async () => {
  const { server } = serverInfo;
  await promisify(server.close).bind(server)();
});

test("test", async () => {
  await request(serverInfo.url, `{ helloWorld }`);
});
