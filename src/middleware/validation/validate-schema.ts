import { RequestHandler } from "express";
import { ObjectSchema } from "joi";
import validation from "../../joi/validation";

type ValidateSchema = (schema: ObjectSchema) => RequestHandler;

const validateSchema: ValidateSchema = (schema) => (req, res, next) => {
  console.log("validateSchema");

  const error = validation(schema, req.body);
  console.log(error);

  if (!error) return next();

  res.status(400).json({ error });
};

export { validateSchema };
