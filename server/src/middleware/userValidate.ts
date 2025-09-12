import { NextFunction, Request, Response } from "express";
import { registerUserValidation } from "../validations/userValidations.js";
const userValidate = (req: Request, _: Response, next: NextFunction): void => {
  const { error } = registerUserValidation.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    throw new Error(errorMessage);
  } else {
    next();
  }
};

export default userValidate;
