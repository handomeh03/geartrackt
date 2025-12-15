import rateLimit from 'express-rate-limit';
export  const rateLimtLogin = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minute
  max: 5, // 5 attemp per 5 minute
  message: 'try letter',
  standardHeaders: true, 
  legacyHeaders: false, 
});