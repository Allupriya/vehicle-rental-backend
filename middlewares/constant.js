const BLACKLIST = [
    "/api/docs/",
    "/api/docs/swagger-ui-standalone-preset.js",
    "/api/docs/swagger-ui.css",
    "/api/docs/swagger-ui-bundle.js",
    "/api/docs/favicon-32x32.png",
    "/api/docs/favicon-16x16.png",
    "/api/api-docs",

    // Public endpoints
    "/api/healthcheck",
    "/api/user/login",
    "/api/AgentDetails",
    "/api/agent/login"
];

module.exports = { BLACKLIST };
