export const environment = {
    production: true,
    staging: false,
    test: false,
    develop: false,
    isMockEnabled: false, // You have to switch this, when your real back-end is done
    hmr: false,
    APP_SECRETE: window["env"]["ENV_RBX_APP_SECRETE"],
    API_BASE_URL: window["env"]["ENV_RBX_API_BASE_URL"],
     API_BASE_URL_2: 'https://aionj2middlewaredev.westindia.cloudapp.azure.com:8080',
    CHANNEL_ID: window["env"]["ENV_RBX_CHANNEL_ID"],
    TENANT_ID: window["env"]["ENV_RBX_TENANT_ID"],
    VIDEO_URL: window["env"]["ENV_RBX_VIDEO_URL"],
  };
  
  setTimeout(() => {
    window["env"] = null;
  }, 5000);
  