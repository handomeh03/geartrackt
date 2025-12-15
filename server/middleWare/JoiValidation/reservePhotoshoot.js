import Joi from "joi";

export const photoshootSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Full name must be a string",
      "string.empty": "Full name is required",
      "string.min": "Full name must be at least 3 characters",
      "any.required": "Full name is required",
    }),

  companyName: Joi.string()
    .max(100)
    .required()
    .messages({
     "string.empty": "Full name is required",  
      "string.base": "Company name must be a string",
      "string.max": "Company name cannot exceed 100 characters",
    }),

  shotLocation: Joi.string()
    .min(3)
    .max(150)
    .required()
    .messages({
      "string.base": "Shoot location must be a string",
      "string.empty": "Shoot location is required",
      "any.required": "Shoot location is required",
    }),

  phoneNumber: Joi.string()
    .pattern(/^[0-9]{9,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must contain only digits (9–15 numbers)",
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
    }),

  note: Joi.string()
    .required()
    .max(500)
    .messages({
     "string.empty": "Shoot location is required",
      "string.max": "Note cannot exceed 500 characters",
    }),

  date: Joi.date()
    .iso()
    .greater("now")
    .required()
    .messages({
      "date.base": "Date must be a valid date",
      "date.greater": "Date must be in the future",
      "any.required": "Date is required",
    }),
});

export function photoshootValidation(schema) {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    req.body = value;
    next();
  };
}

