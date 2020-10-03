(function(window) {
  window.env = window.env || {};
  
  // Environment variables
  window["env"]["ENV_RBX_APP_SECRETE"] = "${ENV_RBX_APP_SECRETE}";
  window["env"]["ENV_RBX_API_BASE_URL"] = "${ENV_RBX_API_BASE_URL}";
  window["env"]["ENV_RBX_CHANNEL_ID"] = "${ENV_RBX_CHANNEL_ID}";
})(this);