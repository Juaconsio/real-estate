import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'sequelize';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errors = err.errors.map((error) => ({
      field: error.path,
      message: error.message,
    }));
    res.status(400).json({ errors });
    return;
  }

  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
