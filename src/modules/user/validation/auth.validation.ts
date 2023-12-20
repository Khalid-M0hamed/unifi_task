import { body } from "express-validator";

import validate from "../../../middlewares/validation";
export const login = [
  // username must be an email

  body("email")
  .isEmail()
  .normalizeEmail({
    gmail_lowercase: true,
    yahoo_lowercase: true,
    outlookdotcom_lowercase: true,
    icloud_lowercase: true,
  })
  .withMessage("invalid email"),

  // password must be at least 5 chars long
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 chars long")
    .optional({ nullable: true, checkFalsy: true })
    .trim(),

  validate,
];
export const refreshToken = [
  body("refreshToken").isString().withMessage("invalid refreshToken"),

  validate,
];