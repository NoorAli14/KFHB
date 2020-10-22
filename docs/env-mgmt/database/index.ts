import * as fs from 'fs';
import * as Knex from 'knex';
const moduleAlias = require('module-alias');

(async () => {
    try {
        const middlewarePATH = `../../../retail/middleware/`;
        // const dbConfig: DBConfigurationService = new DBConfigurationService();

        const connection = require('knex')({ client: 'mssql' });

        // list of services
        const services: string[] = [
            'compliance.service',
            'entitlement.service',
            'identity.service',
            'notifications',
            'reference.service',
            'videocall.service'
        ];

        //Get list of all available folders in retail middleware
        const middlewareDir = getDirectories(middlewarePATH);

        // Find if any define service is missing in middleware folder
        const missingService = services.filter(service =>
            !middlewareDir.includes(service),
        );

        // Check if any required service is missing
        if (missingService?.length > 0) throw new Error(`Middleware services are missing: [${missingService}]`);

        const migrations = services.map(service => {
            return {
                service: {
                    name: service,
                    migrationDir: `${middlewarePATH}/${service}/src/core/database/migrations/`
                },
                files: fs.readdirSync(`${middlewarePATH}/${service}/src/core/database/migrations/`)
            }
        });

        // Loop through all the existing migrations files
        let schema = '';
        for (let migration of migrations) {
            const serviceLoc = `${middlewarePATH}${migration.service.name}`;
            const tsConfig = require(`${serviceLoc}/tsconfig.json`);
            const tsConfigPaths = require("tsconfig-paths");
            let paths = {};
            const middlewareDir1 = getDirectories(`${serviceLoc}/`);
            console.log(middlewareDir1);

            for (let path in tsConfig.compilerOptions.paths) {
                const _path = tsConfig.compilerOptions.paths[path][0];
                paths[path] = [_path.replace('./', `${serviceLoc}/`)];
                console.log(`${path}  ->  ${_path.replace('./', `${__dirname}${serviceLoc}/`)}`)
                moduleAlias.addAlias(path, _path.replace('./', `${serviceLoc}/`));

            }
            console.log(JSON.stringify(paths, null, 2));
            // const cleanup = tsConfigPaths.register({
            //     baseUrl: serviceLoc,
            //     paths
            // });
            // When path registration is no longer needed
            for (let filename of migration.files) {
                console.log(`---> Start exporting ${filename}\n`);
                // Parse date from migration filename
                const date = filename.split('_')[0];
                const comment = `/* [${migration.service.name}] [${date}] - ${filename} */`;

                // Read migration file query into string
                schema = schema + comment + await getSQL(connection, `${migration.service.migrationDir}/${filename}`) + ';\r\n\n\n';
            }


        }
        await fs.promises.truncate('schema.sql', 0);
        await fs.promises.appendFile('schema.sql', `${schema};\r\n\n\n`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();

/**
 * This method is used to generate a raw sql query
 * 
 * @param db : Knex DB connection
 * @param filePath : Location of the migration file
 */
function getSQL(db, filePath): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const { up } = require(filePath);
        resolve(up(db).toString());
    })
}

// Get list of all available file/dir in a given path
function getDirectories(source: string) {
    return fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
}