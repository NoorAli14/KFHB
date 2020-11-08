This application is intended to generate the required database schema as `.sql` files with a single command. The functionality is completely dependent on the individual services providing Knex based database migration scripts.

## Steps to generate all scripts:
* First, ensure that `npm install` has been run on all services to have their required `node_modules` populated. You'll probably need to do this one by one from individual directories of the services that make up the platform.

* Secondly, install all the required packages for this application:
> npm install

* Finally, run the following command on this package:
> npm run gs:all


## Output location:
* All schema files are generated with the convention `schema-<serviceName>.sql` in the `generated-schema` folder.

* All seed files are generated with the convention `seed-<serviceName>.sql` in the `generated-seed` folder.

## Steps to add a new service migrations:
* Ensure that the service added conforms to the database migration scripts standard based on Knex. If not sure, please see existing services, such as `identity.service`.

* Open up the `package.json` file for this application, and add a `gs:<servicename>` npm script. If not sure, please see existing npm scripts in the `package.json` file, such as `gs:identity`. In general, the syntax for these scripts is as shown below:

```
 "gs:identity": "cross-env RBX_SERVICE_NAME=identity.service ts-node --project ../../../retail/middleware/identity.service/tsConfig.json --require ./tsconfig-bootstrap.js index.ts"
 ```

* Also, make sure that the `generate:schema:all` script is also updated to include this new script when generating all schemas.

## Steps to add a new service seed data:
* Ensure that the service added conforms to the database seed scripts standard based on Knex. If not sure, please see existing services, such as `entitlement.service`.

* Open up the `package.json` file for this application, and add a `gsd:<servicename>` npm script. If not sure, please see existing npm scripts in the `package.json` file, such as `gsd:entitlement`. In general, the syntax for these scripts is as shown below:

```
"gsd:entitlements": "cross-env RBX_SERVICE_NAME=entitlement.service ENV_RBX_TENANT_ID=9013C327-1190-4875-A92A-83ACA9029160 ts-node --project ../../../retail/middleware/entitlement.service/tsConfig.json --require ./tsconfig-bootstrap.js generate-seed.ts"
```

* `ENV_RBX_TENANT_ID` in the above command should be the tenant_id for which you want to create the scripts.

* Also, make sure that the `generate:seed:all` script is also updated to include this new script when generating all seeds.

## Known limitations:
* Currently, this is hardcoded to generate only for MS SQL Server.
* Seed data is not versioned or included in the migration history.