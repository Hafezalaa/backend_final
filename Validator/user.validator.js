import { body } from "express-validator";



export const register_validator = [
  body("name")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Sorry, you need to provide a value")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Sorry, you should provide a valid entry"),

  body("email")
    .escape()
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Sorry, you need to provide a value")
    .isEmail()
    .withMessage("Sorry, this is not a valid Email"),

  body("password")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Sorry, you need to provide a value")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/
    )
    .withMessage(
      "Sorry, you should provide a valid entry, please check the password requirements: (UpperCase, LowerCase, numbers and special Char[!@#$%^&*]"
    ),

  body("birthday").escape().trim(),
  
];

export const login_validator = [
  body("email")
    .escape()
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Sorry, you need to provide a value")
    .isEmail()
    .isEmail()
    .withMessage("Sorry, this is not a valid Email"),

  body("password")
    .escape()
    .trim()
    .notEmpty()
    .withMessage("Sorry, you need to provide a value")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/
    )
    .withMessage(
      "Sorry, you should provide a valid entry, please check the password requirements: (UpperCase, LowerCase, numbers and special Char[!@#$%^&*]"
    ),
];
