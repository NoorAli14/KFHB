require('ts-node/register');
require('tsconfig-paths/register');
import { ConfigurationService } from '@common/configuration/configuration.service';
const config: ConfigurationService = new ConfigurationService();
module.exports = {
  development: { ...config.databaseConfig() },
  production: { ...config.databaseConfig() },
};
