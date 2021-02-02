(function(window) {
  window.env = window.env || {};
  
  // Environment variables
  window["env"]["ENV_RBX_APP_SECRETE"] = "${ENV_RBX_APP_SECRETE}";
  window["env"]["ENV_RBX_CHANNEL_ID"] = "${ENV_RBX_CHANNEL_ID}";
  window["env"]["ENV_RBX_TENANT_ID"] = "${ENV_RBX_TENANT_ID}";
  window["env"]["ENV_RBX_VIDEO_URL"] = "${ENV_RBX_VIDEO_URL}";
  window["env"]["ENV_RBX_RETAIL_API_BASE_URL"] = "${ENV_RBX_RETAIL_API_BASE_URL}";
  window["env"]["ENV_RBX_CORPORATE_API_BASE_URL"] = "${ENV_RBX_CORPORATE_API_BASE_URL}";
  
})(this);