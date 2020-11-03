require('ts-node/register');
require('tsconfig-paths/register');
import * as fs from 'fs';
import { DBConfigurationService } from '@rubix/common/configuration/dbconfiguration.service';

(async () => {
  try {
    // Init DBConfigurationService through .env file
    const dbConfig: DBConfigurationService = new DBConfigurationService();

    // Define migration folder directory
    const seedsDir = dbConfig.databaseConfig().seeds.directory as string;

    // Read all available file in migration directory
    const filenames = await fs.promises.readdir(seedsDir);

    // Init DB connection
    const db = require('knex')(dbConfig.databaseConfig());

    // Truncate all existing data in a file
    await fs.promises.truncate('seed.sql', 0);

    // Loop through all the existing migrations files
    for (let filename of filenames) {
      console.log(`---> Start exporting ${filename}\n`);

      // Parse date from seed filename
      // const date = filename.split('_')[0];

      // Read migration file query into string
      let query = await getSQL(db, `${seedsDir}/${filename}`);
      // Format query
      query = query.replace(/\), \(/gi, '),\n(');
      query = query.replace(/\) values \(/gi, ')\nvalues (');

      // Add comment in seed file
      const comment = `/* [${dbConfig.APP.NAME}] - ${filename} */`;
      await fs.promises.appendFile('seed.sql', `${comment};\r\n`);

      // Add query in seed.sql file
      await fs.promises.appendFile('seed.sql', `${query}\r\n\n\n`);
    }
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
    const { processSeed } = require(filePath);
    resolve(processSeed(db));
  });
}
