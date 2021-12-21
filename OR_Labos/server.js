const express = require('express');
const server = express();
var path = require('path');

const indexRouter = require('./Routes/index.routes');
const datatableRouter = require('./Routes/datatable.routes');

server.use(express.json());
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.use(express.urlencoded({ extended: true}));
server.use(express.static(path.join(__dirname, 'public')));
server.use('/', indexRouter);
server.use('/datatable', datatableRouter);

server.listen(8080);