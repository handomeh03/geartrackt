import rateLimit from 'express-rate-limit';
export  const GlobelLimit = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minute
  max: 1000, //1000 requist per 15 minute
  message: 'try letter',
  standardHeaders: true, 
  legacyHeaders: false, 
});