import joi from "joi";


const safeRegex = /^[a-zA-Z0-9 _@.-]*$/;

const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;

export const registerSchema = joi.object({
  fullName: joi.string()
    .min(3)
    .max(50)
    .required()
    .pattern(safeRegex)
    .messages({
      "string.empty": "Full name is required",
      "string.min": "Full name must be at least 3 characters long",
      "string.max": "Full name cannot exceed 50 characters",
      "string.pattern.base": "Full name contains invalid characters",
    }),

  email: joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),

  password: joi.string()
    .required()
    .pattern(strongPassword)
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special symbol (e.g. @, #, $)",
    }),
});

export function registerValid(schema) {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    req.body = value;
    next();
  };
}
