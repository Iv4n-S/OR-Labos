const express = require('express');
const server = express();
var path = require('path');

require('dotenv').config();
const port = process.env.PORT || 8080;

const { auth, requiresAuth } = require('express-openid-connect');

server.use(
  auth({
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET
  })
);

const indexRouter = require('./Routes/index.routes');
const datatableRouter = require('./Routes/datatable.routes');

server.use(express.json());
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.use(express.urlencoded({ extended: true}));
server.use(express.static(path.join(__dirname, 'public')));
server.use('/', indexRouter);
server.use('/datatable', datatableRouter);

server.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
})

server.listen(port);