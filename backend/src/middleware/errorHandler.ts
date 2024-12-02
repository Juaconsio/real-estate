import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'sequelize';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  console.error("Handle ERROR")
  if (err instanceof ValidationError) {
    const errors = err.errors.map((error) => ({
      field: error.path,
      message: error.message,
    }));
    res.status(400).json({ errors });
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  next();
};

export default errorHandler;
