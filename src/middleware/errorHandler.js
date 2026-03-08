import { isHttpError } from 'http-errors';

export const errorHandler = (error, _req, res, _next) => {
  console.log('Error:', error);

  if (isHttpError(error)) {
    return res
      .status(error.status)
      .json({ message: error.message || error.name });
  }

  res.status(500).json({
    message: 'Something went wrong. Please try again later',
  });
};
