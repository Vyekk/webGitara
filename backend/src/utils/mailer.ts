import nodemailer from 'nodemailer';

export function getTransporter() {
    return nodemailer.createTransport({
        host: process.env.MAIL_HOST || 'localhost',
        port: Number(process.env.MAIL_PORT) || 465,
        secure: (process.env.MAIL_SECURE || 'true') === 'true',
        auth: {
            user: process.env.MAIL_USER || '',
            pass: process.env.MAIL_PASSWORD || '',
        },
    });
}
