const fs = require('fs');
const path = require('path');
var express = require('express');
const { accounts, users, writeJSON } = require('./data');
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');


const app = express(); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded( { extended: true}));
app.use('/services', servicesRoutes);
app.use('/account', accountRoutes);

app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts: accounts }));
app.get('/profile', (request, response) => response.render('profile', { user: users[0] }));

app.listen(3000, () => console.log('listening on port: 3000'))