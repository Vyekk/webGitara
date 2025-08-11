import nodemailer from 'nodemailer';

export function getTransporter() {
    const host = process.env.MAIL_HOST;
    const port = Number(process.env.MAIL_PORT || 465);
    const secure = (process.env.MAIL_SECURE || 'true').toLowerCase() === 'true';
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;

    if (!host || !user || !pass) {
        throw new Error('Mailer is not configured. Please set MAIL_HOST, MAIL_USER and MAIL_PASS env vars.');
    }

    return nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
    });
}
