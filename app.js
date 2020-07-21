const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
// const logger = require('morgan');

const indexRouter = require('./routes/index-router');

require('dotenv').config();

// const mongoose = require('mongoose');

// const url = 'mongodb://localhost:27017/chankee';
// const connect = mongoose.connect(url, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   });

// connect.then(() => console.log('Connected correctly to server'),
//     err => console.log(err)
// );

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use('/', indexRouter);

// app.use(logger('dev'));

//for css and img folder
app.use(express.static(path.join(__dirname, 'public')));



app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});