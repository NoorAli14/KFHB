import * as fs from "fs";
import { resolve } from "path";

const RBX_SERVICE_NAME = process.env.RBX_SERVICE_NAME;
const FILENAME_SCHEMA_OUTPUT = `seed-${RBX_SERVICE_NAME}.sql`;
const DIR_MIDDLEWARE = resolve(`../../../retail/middleware/`);
const DIR_SEED = `${DIR_MIDDLEWARE}/${RBX_SERVICE_NAME}/src/core/database/seeds/`;
const DIR_OUTPUT = "generated-seed";
const PATH_SCHEMA_OUTPUT = `./${DIR_OUTPUT}/${FILENAME_SCHEMA_OUTPUT}`;

(async () => {
  try {
    // db driver to generate the queries
    const knex = require("knex")({ client: "mssql" });

    validateStartupParams();

    // get all migration files for the specified service
    const migrationFiles = fs.readdirSync(`${DIR_SEED}`);

    // process each file and generate the output in a string
    let scripts = "";
    for (let file of migrationFiles) {
      const filename = file.normalize();
      console.log(`Processing [${filename}]`);
      
      // Parse date from migration filename
      const comment = `/* [${RBX_SERVICE_NAME}] - ${filename} */\r\n`;
      // Read migration file query into string
      let query = await getSQL(knex, `${DIR_SEED}/${filename}`);
      // Format query
      query = query.replace(/\), \(/gi, '),\n(');
      query = query.replace(/\) values \(/gi, ')\nvalues (');
      scripts += comment + query + "\r\n\n\n";
    }

    // write the generate schema to the output file
    await fs.promises.writeFile(PATH_SCHEMA_OUTPUT, scripts);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

// Validate and log parameters for startup
function validateStartupParams() {
  console.log("---------------");
  console.log(`Running for service:         [${RBX_SERVICE_NAME}]\r`);
  console.log(`Using middleware path:       [${DIR_MIDDLEWARE}]`);
  console.log(`Reading seed files from:     [${DIR_SEED}]`);
  console.log(`Writing to output filename:  [${PATH_SCHEMA_OUTPUT}]`);
  console.log("---------------");

  if (RBX_SERVICE_NAME == undefined) {
    console.error(
      "Undefined service name. Please define the RBX_SERVICE_NAME env variable."
    );
    process.exit(1);
  }

  if (fs.existsSync(PATH_SCHEMA_OUTPUT)) {
    console.error(
      `Output file [${PATH_SCHEMA_OUTPUT}] already exists; cannot continue!`
    );
    process.exit(1);
  }
}

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

// Get list of all available file/dir in a given path
function getDirectories(source: string) {
  return fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}
