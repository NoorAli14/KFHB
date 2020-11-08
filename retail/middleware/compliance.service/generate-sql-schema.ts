require('ts-node/register');
require('tsconfig-paths/register');
import * as fs from 'fs';
import { DBConfigurationService } from '@rubix/common/configuration/dbconfiguration.service';

(async () => {
  try {
    // Init DBConfigurationService through .env file
    const dbConfig: DBConfigurationService = new DBConfigurationService();

    // Define migration config
    const migrationsDir = dbConfig.databaseConfig().migrations
      .directory as string;
    const migrationTableName = dbConfig.databaseConfig().migrations
      .tableName as string;

    // Read all available file in migration directory
    const fileNames = await fs.promises.readdir(migrationsDir);

    // Init DB connection
    const db = require('knex')(dbConfig.databaseConfig());

    // Truncate all existing data in a file
    await fs.promises.truncate('schema.sql', 0);

    console.log(`---> Start exporting create migration table\n`);

    // Add comment in migration file
    const comment = `/* [${dbConfig.APP.NAME}] - create migration table */`;
    await fs.promises.appendFile('schema.sql', `${comment}\r\n`);

    // Add create migration query to schema.sql file
    const query = getCreateMigrationTableSql(db, migrationTableName);
    await fs.promises.appendFile('schema.sql', `${query};\r\n\n\n`);

    // Loop through all the existing migrations files
    for (let fileName of fileNames) {
      console.log(`---> Start exporting ${fileName}\n`);

      // Parse date from migration filename
      const date = fileName.split('_')[0];

      // Read migration file query into string
      const query = await getSQL(db, `${migrationsDir}/${fileName}`);

      // Add comment in migration file
      const comment = `/* [${dbConfig.APP.NAME}] [${date}] - ${fileName} */`;
      await fs.promises.appendFile('schema.sql', `${comment}\r\n`);

      // Add query in schema.sql file
      await fs.promises.appendFile('schema.sql', `${query};\r\n\n`);

      console.log(`---> Start exporting migration table record insertion script\n`);
      // Add migration comment to schema.sql file
      const migrationComment = `/* [${dbConfig.APP.NAME}] Add ${fileName} to migration table */`;
      // Add migration query to schema.sql file
      await fs.promises.appendFile('schema.sql', `${migrationComment}\r\n`);
      const migrationQuery = getInsertIntoMigrationTableSql(
        db,
        migrationTableName,
        { name: fileName, batch: 1 },
      );
      await fs.promises.appendFile('schema.sql', `${migrationQuery};\r\n\n\n`);
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
    const { up } = require(filePath);
    resolve(up(db).toString());
  });
}

/**
 * This method generates a raw sql query for creating migration table
 *
 * @param db : Knex DB connection
 * @param tableName : Migration table name
 */
function getCreateMigrationTableSql(db: any, tableName: string): string {
  return db.schema
    .createTable(tableName, table => {
      table.increments();
      table.string('name');
      table.integer('batch');
      table.timestamp('migration_time').defaultTo(db.fn.now());
    })
    .toString();
}

/**
 * This method is used to generate a raw sql query
 * for inserting record into migration table
 *
 * @param db : Knex DB connection
 * @param tableName : Migration table name
 * @param data : Data to be inserted into table
 */
function getInsertIntoMigrationTableSql(
  db: any,
  tableName: string,
  data: any,
): string {
  const migrationData = {
    name: data.name,
    batch: data.batch,
  };
  return db(tableName)
    .insert(migrationData)
    .toString();
}
