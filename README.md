## Initial Setup

1.  [Install nodenv](https://github.com/nodenv/nodenv#installation)
2.  [Install yarn 1.x](https://classic.yarnpkg.com/en/docs/install)
3.  [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
4.  Run `yarn install`

## Starting the servers

Before starting any of the GraphQL servers, you should first start the stub REST server:

     yarn startStub

To then start the GraphQl server standalone:

1. Run `yarn start`
2. Go to http://localhost:4000

To start the GraphQL server inside a local instance of API Gateway:

1. Run `sam local start-api`
2. Go to http://localhost:3000

## Running the tests

To run the tests:

        yarn test
