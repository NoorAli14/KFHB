(function(window) {
    window.env = window.env || {};
  
    // Environment variables
    window["env"]["ENV_CDT_API_BASE_URL"] = "${ENV_CDT_API_BASE_URL}";
    window["env"]["ENV_CDT_WEB_CHANNEL_ID"] = "${ENV_CDT_WEB_CHANNEL_ID}";
    window["env"]["ENV_CDT_VIDEO_CHANNEL_ID"] = "${ENV_CDT_VIDEO_CHANNEL_ID}";
    window["env"]["ENV_CDT_APP_SECRETE"] = "${ENV_CDT_APP_SECRETE}";
    window["env"]["ENV_CDT_VIDEO_URL"] = "${ENV_CDT_VIDEO_URL}";
    window["env"]["ENV_CDT_GATEWAY_ID"] = "${ENV_CDT_GATEWAY_ID}";
  })(this);