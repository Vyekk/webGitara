import nodemailer from 'nodemailer';

export function getTransporter() {
    return nodemailer.createTransport({
        host: 'mail18.mydevil.net',
        port: 465,
        secure: true,
        auth: {
            user: 'support@konradkoluch.usermd.net',
            pass: 'webgitaraPoczta99',
        },
    });
}
