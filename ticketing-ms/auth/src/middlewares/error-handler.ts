import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.error('Request Validation Error:', err.errors);
  }

  if (err instanceof DatabaseConnectionError) {
    console.error('Database Connection Error:', err.message);
  }

  res.status(400).send({
    message: err.message,
  });
  next();
};
