export const environment = {
  production: true,
  staging: false,
  test: false,
  develop: false,
  isMockEnabled: false, // You have to switch this, when your real back-end is done
  authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
  APP_SECRETE: 'abfFGHIepqrstuvwSTUCDEXYZ',
  API_BASE_URL: 'https://rubix-dev01.conduit-aiondigital.com',
  API_BASE_URL_2: 'https://aionj2middlewaredev.westindia.cloudapp.azure.com:8080',
  CHANNEL_ID: 'RUBIX-DEV-INT',
  TENANT_ID: '9013C327-1190-4875-A92A-83ACA9029160',
  hmr: false,
};

setTimeout(() => {
  window['env'] = null;
}, 5000);
