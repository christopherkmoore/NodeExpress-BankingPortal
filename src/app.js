const fs = require('fs');
const path = require('path');
var express = require('express');

const app = express(); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const accountData = fs.readFileSync('src/json/accounts.json', { encoding: 'utf8' });
const accounts = JSON.parse(accountData)

const userData = fs.readFileSync('src/json/users.json', { encoding: 'utf8'} );
const users = JSON.parse(userData)

app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts: accounts }));
app.get('/savings', (request, response) => response.render('account', { account: accounts.savings }));
app.get('/checking', (request, response) => response.render('account', { account: accounts.checking }));
app.get('/credit', (request, response) => response.render('account', { account: accounts.credit }));
app.get('/profile', (request, response) => response.render('profile', { user: users[0] }));

app.listen(3000, () => console.log('listening on port: 3000'))