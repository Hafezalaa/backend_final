import { validationResult } from "express-validator";



// this function can handle all the validators and sanitizers:

const resultHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};


export default resultHandler