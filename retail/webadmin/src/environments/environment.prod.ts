export const environment = {
    production: true,
    staging: false,
    test: false,
    develop: false,
    isMockEnabled: false, // You have to switch this, when your real back-end is done
    hmr: false,
    APP_SECRETE: window["env"]["ENV_RBX_APP_SECRETE"],
    CHANNEL_ID: window["env"]["ENV_RBX_CHANNEL_ID"],
    TENANT_ID: window["env"]["ENV_RBX_TENANT_ID"],
     API_BASE_URL: 'http://10.5.1.37',
    VIDEO_URL: window["env"]["ENV_RBX_VIDEO_URL"],
    RETAIL_API_BASE_URL: window["env"]["ENV_RBX_RETAIL_API_BASE_URL"],
    CORPORATE_API_BASE_URL: window["env"]["ENV_RBX_CORPORATE_API_BASE_URL"]
  };
  
setTimeout(() => {
    window['env'] = null;
  }, 5000);

