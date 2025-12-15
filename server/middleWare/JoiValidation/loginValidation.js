import joi from "joi";

const safeRegex = /^[a-zA-Z0-9 _@.-]*$/;

export const loginSchema = joi.object({
  email: joi.string()
    .email()
    .required()
    .pattern(safeRegex)
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "string.pattern.base": "Email contains invalid characters"
    }),

  password: joi.string()
    .min(6)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
    })
});

export function loginValid(schema) {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    req.body = value;
    next();
  };
}
