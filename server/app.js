const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const Raven = require('raven');
const indexRouter = require('./routes/index');
const { getErrorResponse } = require('./middleware/ResponseGenerator');

const app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Raven.config('https://f39cc8dbd05141f0a09dd839b5c50fa3@sentry.io/1228707', { sendTimeout: 5 }).install();
app.use(Raven.requestHandler());
app.use(Raven.errorHandler());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new Error('NOT_FOUND'));
});

// error handler
app.use((err, req, res, next) => {
  const errorResponse = getErrorResponse(err, req, Raven,res);
  res.status(errorResponse.httpStatusCode).json(Object.assign(errorResponse.body, {status: false}));
});

module.exports = app;
