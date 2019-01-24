const fs = require('fs');
const path = require('path');
var express = require('express');

const app = express(); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded( { extended: true}));

const accountData = fs.readFileSync('src/json/accounts.json', { encoding: 'utf8' });
const accounts = JSON.parse(accountData)

const userData = fs.readFileSync('src/json/users.json', { encoding: 'utf8'} );
const users = JSON.parse(userData)

// GET
app.get('/', (req, res) => res.render('index', { title: 'Account Summary', accounts: accounts }));
app.get('/savings', (request, response) => response.render('account', { account: accounts.savings }));
app.get('/checking', (request, response) => response.render('account', { account: accounts.checking }));
app.get('/credit', (request, response) => response.render('account', { account: accounts.credit }));
app.get('/profile', (request, response) => response.render('profile', { user: users[0] }));
app.get('/transfer', (request, response) => response.render('transfer'));
app.get('/payment', (request, response) => response.render('payment', { account: accounts.credit }));
//POST
app.post('/transfer', (request, response) => {
    
    const amount = parseInt(request.body.amount);
    if (request.body.from == "checking") {
        accounts["checking"].balance -= amount; 
        accounts["savings"].balance += amount;
    }
    if (request.body.from == "savings") {
        accounts["savings"].balance =- amount;
        accounts["checking"].balance += amount;
    }
    const accountsJSON =  JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
    response.render('transfer', { message: "Transfer Completed" });


});
app.post('/payment', (request, response) => {
    
    const amount = parseInt(request.body.amount);
    accounts.credit.balance -= amount;
    accounts.credit.available += amount
    
    const accountsJSON =  JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
    response.render('payment', { message: "Payment Successful", account: accounts.credit });

});


app.listen(3000, () => console.log('listening on port: 3000'))