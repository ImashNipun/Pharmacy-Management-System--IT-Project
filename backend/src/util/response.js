
export const response = ({ res, statusCode = 200, message, data }) => {
  const payload = {
    data,
    message,
  };

  res.status(statusCode).json(payload);
};
