const nodemailer = require("nodemailer");
const emailConfig = require("../config/email.config");
const config = require("../config/config");
const { verifyEmailTemplate } = require("../templates/emailTemplates");

const transport = nodemailer.createTransport({
    host: emailConfig.SMTP_HOST,
    port: emailConfig.SMPT_PORT,
    auth: {
        user: emailConfig.SMTP_USERNAME,
        pass: emailConfig.SMTP_PASSWORD,
    },
});

const sendEmail = async (to, subject, html) => {
    const msg = { from: emailConfig.EMAIL_FROM, to, subject, html };
    await transport.sendMail(msg);
};
exports.sendEmail = sendEmail;

exports.sendVerificationEmail = async (to, token) => {
    const subject = "Email Verification";
    const verificationEmailUrl = `${config.api_url}:${config.port}/auth/v1/verify-email/${token}`;
    const html = verifyEmailTemplate(verificationEmailUrl);
    await sendEmail(to, subject, html);
};
