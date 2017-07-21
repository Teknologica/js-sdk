# js-sdk
Testing SDK structuring

## Environment Variables
Create a `.env` file and enter the following values
```
API_INTEGRATION_URL='http://api-sandbox.dev-local.rebilly.com'
API_INTEGRATION_KEY='0000000000000000000000000000000000000000'

TEST_SMTP_USER='some@where.com'
TEST_SMTP_PASS='hello123'
TEST_SMTP_HOST='host.com'
TEST_SMTP_PORT='465'
```

## Dev Commands
```
//build development dist folder without sourcemap
npm run build:dev

//build release dist folder with sourcemap (release)
npm run build:prod

//run unit tests
npm run unit

//watch unit tests and re-run on change
npm run unit:watch

//run integration tests
npm run integration

//watch integration tests and re-run on change
npm run integration:watch

//watch a particular integration test file and re-run on change
npm run integration:watch:only -- ./test/integration/specs/file.spec.js

//generate coverage report
npm run coverage
```
