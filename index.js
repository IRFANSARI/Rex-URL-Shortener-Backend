require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database.js');
const userRouter = require('./modules/user/routes/userRoutes.js');
const linkRouter = require('./modules/links/routes/linkRoutes.js');
const userAuthMiddleware = require('./middlewares/userAuthMiddleware.js');

const app = express();
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT || 11786;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userAuthMiddleware);

app.use('/api/user', userRouter);
app.use('/api/links', linkRouter);
app.get('/:shortURL', linkRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running.... \t${BASE_URL}`);
});
