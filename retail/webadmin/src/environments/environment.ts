// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    staging: false,
    test: false,
    develop: false,
    isMockEnabled: true, // You have to switch this, when your real back-end is done
    authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
    APP_SECRETE: 'abfFGHIepqrstuvwSTUCDEXYZ',
    // API_BASE_URL:"http://localhost:3000",
    RETAIL_API_BASE_URL: 'https://rubix-dev01.conduit-aiondigital.com',
    CORPORATE_API_BASE_URL: 'https://rubixcorp-dev01.uksouth.cloudapp.azure.com',
    CHANNEL_ID: 'RUBIX-DEV-INT',
    TENANT_ID: '9013C327-1190-4875-A92A-83ACA9029160',
    VIDEO_URL: 'https://rubix-dev01.conduit-aiondigital.com:8443',
    hmr: false,
    API_BASE_URL: 'https://www.kfhbonline.com/J2Retail',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
