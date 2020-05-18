export const makeSuccessResponse = (res, result) => res.status(200).json({
  status: 'OK',
  message: null,
  result,
});

export const makeErrorResponse = (res, error) => res.status(500).json({
  status: 'Error',
  message: error.message,
  result: null,
});
