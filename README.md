1.  [Install nodenv](https://github.com/nodenv/nodenv#installation)
2.  [Install yarn 1.x](https://classic.yarnpkg.com/en/docs/install)
3.  [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
4.  Run `yarn install`
5.  To start the GraphQL server inside Express, run:

        yarn start

    and goto http://localhost:4000

6.  To start the GraphQL server inside a local instance of API Gateway, run:

        sam local start-api

    and go to http://localhost:3000

7.  To run the tests:

         yarn test
