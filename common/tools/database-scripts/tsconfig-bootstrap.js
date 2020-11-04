const path = require ('path');

const RBX_SERVICE_NAME = process.env.RBX_SERVICE_NAME;
const MIDDLEWARE_PATH = path.resolve(`../../../retail/middleware/`);

const BASE_URL = `${MIDDLEWARE_PATH}/${RBX_SERVICE_NAME}`;
console.log(`Base URL: [${BASE_URL}]`);

const config = require(`${BASE_URL}/tsconfig.json`);
const tsconfigPaths = require('tsconfig-paths');


tsconfigPaths.register({
    baseUrl: BASE_URL,
    paths: config.compilerOptions.paths
});

console.log(config.compilerOptions.paths);
