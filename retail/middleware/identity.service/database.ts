require('ts-node/register');
require('tsconfig-paths/register');
import { DBConfigurationService } from '@rubix/common/configuration/dbconfiguration.service';
const dbConfig: DBConfigurationService = new DBConfigurationService();
module.exports = {
  development: { ...dbConfig.databaseConfig() },
  production: { ...dbConfig.databaseConfig() },
  test: { ...dbConfig.databaseConfig() },
};
