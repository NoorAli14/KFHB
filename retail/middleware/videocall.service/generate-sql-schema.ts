require('ts-node/register');
require('tsconfig-paths/register');
import * as fs from 'fs';
import { DBConfigurationService } from '@rubix/common/configuration/dbconfiguration.service';

(async () => {
    try {
        // Init DBConfigurationService through .env file
        const dbConfig: DBConfigurationService = new DBConfigurationService();

        // Define migration folder directory
        const migrationsDir = dbConfig.databaseConfig().migrations.directory as string;

        // Read all available file in migration directory
        const filenames = await fs.promises.readdir(migrationsDir);

        // Init DB connection
        const db = require('knex')(dbConfig.databaseConfig());

        // Truncate all existing data in a file
        await fs.promises.truncate('schema.sql', 0);

        // Loop through all the existing migrations files
        for (let filename of filenames) {
            console.log(`---> Start exporting ${filename}\n`);

            // Parse date from migration filename
            const date = filename.split('_')[0];

            // Read migration file query into string
            const query = await getSQL(db, `${migrationsDir}/${filename}`);

            // Add comment in migration file
            const comment = `/* [${dbConfig.APP.NAME}] [${date}] - ${filename} */`
            await fs.promises.appendFile('schema.sql', `${comment};\r\n`);

            // Add query in schema.sql file
            await fs.promises.appendFile('schema.sql', `${query};\r\n\n\n`);
        }
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();

function getSQL(db, filePath): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const { up } = require(filePath);
        resolve(up(db).toString());
    })
}