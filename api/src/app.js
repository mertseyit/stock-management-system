const express = require('express');
const app = express();
const sequelize = require('./database/connection');
const ErrorHandler = require('./middlewares/ErrorHandler');
const customError = require('./utils/customError');
const cors = require('cors');
const malzemeRouter = require('./routes/malzeme.route');
const stokIslemiRouter = require('./routes/stokIslemi.route');
const birimRouter = require('./routes/birim.router');
const tedarikciRouter = require('./routes/tedarikci.router');
//configurations and global middlewares
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//routes
app.get(`/${process.env.SERVER_API_VERSION_1}`, async (req, res, next) => {
  try {
    res.status(200).json({
      msg: 'Server Running Successfuly',
      status: 200
    });
  } catch (error) {
    return next(customError(error, 500));
  }
});

app.use(`/${process.env.SERVER_API_VERSION_1}/malzeme`, malzemeRouter);
app.use(`/${process.env.SERVER_API_VERSION_1}/stok-islemi`, stokIslemiRouter);
app.use(`/${process.env.SERVER_API_VERSION_1}/birim`, birimRouter);
app.use(`/${process.env.SERVER_API_VERSION_1}/tedarikci`, tedarikciRouter);

//cathc all 404 routes
app.use('*', (req, res, next) => {
  const error = new Error();
  error.message = `Cound't access ${req.originalUrl}`;
  return next(customError(error, 404));
});

//express global error handler
app.use(ErrorHandler);

sequelize
  .authenticate()
  .then(() => {
    console.log('connecting to database...');
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log('database connection established.');
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        `Server listen on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${process.env.SERVER_API_VERSION_1}`
      );
    });
  });
