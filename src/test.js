const { ApolloServer } = require("apollo-server");
const { request } = require("graphql-request");
const { createConfig } = require("./config");
const { Stubby } = require("stubby");
const { promisify } = require("util");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

let serverInfo;
let stubby;

beforeAll(async () => {
  stubby = new Stubby();

  // Start all stubby services on ephemeral ports to avoid port conflicts
  await promisify(stubby.start).bind(stubby)({
    stubs: 0,
    admin: 0,
    tls: 0,
    data: yaml.safeLoad(
      fs.readFileSync(path.join(__dirname, "..", "stubby.yaml"))
    ),
  });
  const { address: stubAddress, port: stubPort } = stubby.stubsPortal.address();

  const apolloServer = new ApolloServer(
    // Parameterize the Apollo config with the details of where the stub is
    // running
    createConfig({ helloWorldUrl: `http://${stubAddress}:${stubPort}` })
  );

  // Start Apollo Server on ephemeral port to avoid port conflicts
  serverInfo = await apolloServer.listen({ port: 0 });
});

test("helloWorld", async () => {
  const data = await request(serverInfo.url, `{ helloWorld }`);
  expect(data.helloWorld).toEqual("Hello World!");
});

test("epoch", async () => {
  const data = await request(serverInfo.url, `{ epoch }`);
  expect(data.epoch).toEqual("1970-01-01T00:00:00.000Z");
});

afterAll(async () => {
  await promisify(stubby.stop).bind(stubby)();
  const { server } = serverInfo;
  await promisify(server.close).bind(server)();
});
