export const respondErrors = (res) => (err) => (
  res.status(err.code || 500).send(err || { message: 'Internal Error' })
);

export const respondResult = (res) => (result) => (
  res.status(200).send(result)
);

export const respondSuccess = (res) => () => (
  res.status(200).send({ message: 'Success' })
);
