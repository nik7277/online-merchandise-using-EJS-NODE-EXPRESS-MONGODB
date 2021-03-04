var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require('./db/mongoose');
const logger = require('morgan');
const moment = require('moment-timezone');


const auth = require('./middleware/auth');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRegistration');
const authRouter = require('./routes/auth');
const logoutRouter = require('./routes/logout');
const itemsRouter = require('./routes/items');
const addItemRouter = require('./routes/addItem');
const deleteItemRouter = require('./routes/deleteItem');
const cartRouter = require('./routes/cart');
const cartItemsRouter = require('./routes/cartItems');
const deletecartRouter = require('./routes/deleteCart');
const updateCartRouter = require('./routes/updateCart');
const editItemRouter = require('./routes/editItem');
const ordersRouter = require('./routes/orders');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usersRegistration', usersRouter);
app.use('/auth',authRouter);
app.use('/logout', logoutRouter);
app.use('/items', auth, itemsRouter);
app.use('/addItem', addItemRouter);
app.use('/deleteItem', deleteItemRouter);
app.use('/cart', cartRouter);
app.use('/cartItems', cartItemsRouter);
app.use('/deleteCart', deletecartRouter);
app.use('/updateCart', updateCartRouter);
app.use('/editItem', editItemRouter);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


