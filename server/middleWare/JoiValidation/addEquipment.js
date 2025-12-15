import joi from "joi";

const imagePattern=/^data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+$/;

export const addEquipmentSchema = joi.object({
  code: joi.string()
    .alphanum() 
    .min(2)
    .required()
    .messages({
      "string.alphanum": "Code should only contain letters and numbers",
      "string.empty": "Code is required"
    }),

  name: joi.string()
    .min(4)
    .max(50)
    .required()
    .messages({
      "string.min": "Name must be at least 4 characters",
      "any.required": "Name is required"
    }),

  category: joi.string()
    .valid("camera", "lens", "lighting", "audio", "drone", "accessories") 
    .required()
    .messages({
      "any.only": "Category must be one of the predefined types",
    }),

  condition: joi.string()
    .valid("available", "out", "needscharging")
    
,
  location: joi.string()
    .min(3)
    .max(50)
    .required(),

  note: joi.string()
    .min(5)
    .max(250)
    .required(),

  purchaseDate: joi.date()
    .iso()
    .required()
    .messages({
      "date.base": "Purchase date must be a valid date (YYYY-MM-DD)"
    }),

  photo: joi.string()
  .required()
  .messages({
    "any.required": "Photo is required"
  })

});

export function addEquipmentValid(schema) {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    req.body = value;
    next();
  };
}