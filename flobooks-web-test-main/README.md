# Running

Running all the classes inside test 
`npx playwright test`

To Generate report: `allure generate my-allure-results -o allure-report --clean && allure open allure-report`

To run a particular spec 
`npx playwright test class-name.js`

To check a pass/fail test report
`npm run generate`

To run a particular test mark the test as test.only which you want to run then run the command 
`npx playwright test` 

You can also run a specific test by specifing the line number of that test.

`npx playwright test specs/specs/Dashboard.spec.js:8`

To debug a test cases

`npx playwright test --debug`

By default tests are run in niobooks env

To run a test in dev env
`STAGING=1 npx playwight test`



