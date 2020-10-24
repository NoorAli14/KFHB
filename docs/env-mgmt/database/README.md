This application is intended to generate the required database schema as `.sql` files with a single command. The functionality is completely dependent on the individual services providing Knex based database migration scripts.

## Steps to generate all scripts:
* First, ensure that `npm install` has been run on all services to have their required `node_modules` populated. You'll probably need to do this one by one from individual directories of the services that make up the platform.
* Secondly, install all the required packages for this application:
> npm install
* Finally, run the following command on this package:
> npm run gs:all

## Output location:
* All schemas files are generated with the convention `schema-<serviceName>.sql` in the `generated-schema` folder.

## Steps to add a new service:
* Ensure that the service added conforms to the databse migration scripts standard based on Knex. If not sure, please see existing services, such as `identity.service`.
* Open up the `package.json` file for this application, and add a `gs:<servicename>` npm script. If not sure, please see existing npm scripts in the `package.json` file, such as `gs:identity`. In general, the syntax for these scripts is as shown below:
> "gs:identity": "cross-env RBX_SERVICE_NAME=identity.service ts-node --project ../../../retail/middleware/identity.service/tsConfig.json --require ./tsconfig-bootstrap.js index.ts"
* Also, make sure that the `gs:all` script is also updated to include this new script when generating all schemas.

## Known limitations:
* Currently, this is hardcoded to generate only for MS SQL Server.