import * as fs from 'fs';
import { resolve } from 'path';


const RBX_SERVICE_NAME = process.env.RBX_SERVICE_NAME;
const FILENAME_SCHEMA_OUTPUT = `schema-${RBX_SERVICE_NAME}.sql`;
const DIR_MIDDLEWARE = resolve(`../../../retail/middleware/`);
const DIR_MIGRATION = `${DIR_MIDDLEWARE}/${RBX_SERVICE_NAME}/src/core/database/migrations/`;
const DIR_OUTPUT = "generated-schema";
const PATH_SCHEMA_OUTPUT = `./${DIR_OUTPUT}/${FILENAME_SCHEMA_OUTPUT}`;


(async () => {
    try {
        // db driver to generate the queries
        const knex = require('knex')({ client: 'mssql' });

        validateStartupParams();

        // get all migration files for the specified service        
        const migrationFiles = fs.readdirSync(`${DIR_MIGRATION}`);

        // process each file and generate the output in a string
        let schema = "";
        for (let file of migrationFiles) {
            const filename = file.normalize();
            console.log(`Processing [${filename}]`);

            // Parse date from migration filename
            const date = filename.split('_')[0];
            const comment = `/* [${RBX_SERVICE_NAME}] [${date}] - ${filename} */\r\n`;
            schema += comment + await getSQL(knex, `${DIR_MIGRATION}/${filename}`) + ';\r\n\n\n';
        }

        // write the generate schema to the output file
        await fs.promises.writeFile(PATH_SCHEMA_OUTPUT, `${schema};\r\n\n\n`);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();



// Validate and log parameters for startup
function validateStartupParams() {
    console.log ('---------------')
    console.log(`Running for service:         [${RBX_SERVICE_NAME}]\r`);
    console.log(`Using middleware path:       [${DIR_MIDDLEWARE}]`);
    console.log(`Reading migration files from [${DIR_MIGRATION}]`);
    console.log(`Writing to output filename:  [${PATH_SCHEMA_OUTPUT}]`);
    console.log ('---------------')

    if (RBX_SERVICE_NAME == undefined) {
        console.error('Undefined service name. Please define the RBX_SERVICE_NAME env variable.');
        process.exit(1);
    }

    if (fs.existsSync(PATH_SCHEMA_OUTPUT)) {
        console.error(`Output file [${PATH_SCHEMA_OUTPUT}] already exists; cannot continue!`);
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