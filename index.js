require('dotenv').config();
const express = require('express');
const connectDB = require('./config/databaseConfig.js');
const linkRouter = require('./routes/linkRoutes.js');

const app = express();
const URL = process.env.URL;
const PORT = process.env.PORT || 11786;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hi');
});
app.use('/links', linkRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running.... \t${URL}:${PORT}/`);
});