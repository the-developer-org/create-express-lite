const config = {
    development: {
        SMTP_HOST: process.env.SMTP_HOST_DEV,
        SMPT_PORT: process.env.SMPT_PORT_DEV,
        SMTP_USERNAME: process.env.SMTP_USERNAME_DEV,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD_DEV,
        EMAIL_FROM: process.env.EMAIL_FROM_DEV,
    },
    production: {
        SMTP_HOST: process.env.SMTP_HOST_PROD,
        SMPT_PORT: process.env.SMPT_PORT_PROD,
        SMTP_USERNAME: process.env.SMTP_USERNAME_PROD,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD_PROD,
        EMAIL_FROM: process.env.EMAIL_FROM_PROD,
    },
};

module.exports =
    process.env.NODE_ENV === "production"
        ? config.production
        : config.development;
