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

  // Start all stubby services on ephemeral ports
  await promisify(stubby.start).bind(stubby)({
    stubs: 0,
    admin: 0,
    tls: 0,
    data: yaml.safeLoad(
      fs.readFileSync(path.join(__dirname, "..", "stubby.yaml"))
    ),
  });
  const stubsAddress = stubby.stubsPortal.address();

  const apolloServer = new ApolloServer(
    createConfig({
      helloWorldUrl: `http://${stubsAddress.address}:${stubsAddress.port}`,
    })
  );

  // Start server on ephemeral port
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
