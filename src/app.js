import express from 'express';
const app = express();

app.get('/', (req, res) => {
  console.log('==========');
  res.send('ok');
});

export default app;
