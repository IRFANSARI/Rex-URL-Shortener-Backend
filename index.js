require('dotenv').config();
const express = require('express');
const connectDB = require('./config/databaseConfig');
const linkRouter = require('./routes/linkRoutes');

const app = express();
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT || 11786;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/links', linkRouter);
app.get('/:shortURL', linkRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running.... \t${BASE_URL}`);
});
