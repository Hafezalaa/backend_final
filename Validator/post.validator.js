import { body } from "express-validator";
import regexPattern from "./detector.js"

export const post_validator=[
    
  
    body("post")
      .escape()
      .trim()
      .notEmpty()
      .withMessage("Sorry, you need to provide a comment")
      .isLength({ min: 1, max: 500 })
      .withMessage("The comment shouldn't exceed 500 Characters")
      .not()
      .matches(regexPattern)
      .withMessage("Inappropriate language detected")
      ,
  
  ]