import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minut
    max: 10, // max 10 prób na IP
    message: 'Za dużo prób, spróbuj ponownie później.',
});

export const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 godzina
    max: 5,
    message: 'Za dużo rejestracji z tego IP, spróbuj później.',
});

export const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 godzina
    max: 5,
    message: 'Za dużo prób resetu hasła, spróbuj później.',
});

export const commentLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minut
    max: 20,
    message: 'Za dużo komentarzy, spróbuj później.',
});

export const genericLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuta
    max: 60,
    message: 'Za dużo żądań, spróbuj później.',
});
