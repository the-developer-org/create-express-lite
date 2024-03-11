const config = {
    development: {
        port: process.env.DEV_PORT || 3000,
        database: {
            url: process.env.MONGODB_DEV_URI,
        },
    },
    production: {
        port: process.env.PROD_PORT || 8080,
        database: {
            url: process.env.MONGODB_PROD_URI,
        },
    },
};

module.exports =
    process.env.NODE_ENV === "production"
        ? config.production
        : config.development;
