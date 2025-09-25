import Joi from "joi";

export const registerUserValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email address",
    "any.required": "Email is required",
  }),
  fullName: Joi.string().min(2).max(50).required().messages({
    "string.min": "Full name must be at least 2 characters",
    "any.required": "Full name is required",
  }),
  username: Joi.string().pattern(/^[a-zA-Z0-9_-]+$/).min(3).max(30)
    .required().messages({
      "string.pattern.base": "Username can only contain letters, numbers, underscores, and hyphens",
      "string.min": "Username must be at least 3 characters",
      "any.required": "Username is required",
    }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
  profileImage: Joi.object({
    url: Joi.string().uri().allow(null, ""),
    public_id: Joi.string().allow(null, ""),
  }).optional(),

  backgroundImage: Joi.object({
    url: Joi.string().uri().allow(null, ""),
    public_id: Joi.string().allow(null, ""),
  }).optional(),

  socials: Joi.object({
    linkedin: Joi.string().uri().allow(null, ""),
    instagram: Joi.string().uri().allow(null, ""),
    github: Joi.string().uri().allow(null, ""),
  }).optional(),

  bio: Joi.string().max(300).allow(null, ""),
  location: Joi.string().max(100).allow(null, ""),
  phoneNumber: Joi.string()
    .pattern(/^[0-9+\-() ]+$/)
    .allow(null, "")
    .messages({ "string.pattern.base": "Phone number format is invalid" }),

  isPremium: Joi.boolean().default(false),
  role: Joi.string().valid("USER", "ADMIN").default("USER"),
  isVerified: Joi.boolean().default(false),
  isBanned: Joi.boolean().default(false),

  provider: Joi.string().valid("local", "google").default("local"),
  providerId: Joi.string().allow(null, ""),

  profile: Joi.object({
    headline: Joi.string().allow(null, ""),
    skills: Joi.array().items(Joi.string()),
  }).optional(),

  cvFiles: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().allow(null, ""),
      public_id: Joi.string().allow(null, ""),
    })
  ).optional(),

  experience: Joi.array().items(
    Joi.object({
      company: Joi.string().required(),
      role: Joi.string().required(),
      from: Joi.date().required(),
      to: Joi.date().allow(null),
      desc: Joi.string().allow(null, ""),
    })
  ).optional(),

  education: Joi.array().items(
    Joi.object({
      school: Joi.string().required(),
      degree: Joi.string().required(),
      from: Joi.date().required(),
      to: Joi.date().allow(null),
    })
  ).optional(),
});
