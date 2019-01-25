const express = require('express');
const router = express.Router();
const { accounts, writeJSON } = require('../data');

router.get('/transfer', (request, response) => response.render('transfer'));
router.get('/payment', (request, response) => response.render('payment', { account: accounts.credit }));

router.post('/transfer', (request, response) => {
    
    const amount = parseInt(request.body.amount);
    if (request.body.from == "checking") {
        accounts["checking"].balance -= amount; 
        accounts["savings"].balance += amount;
    }
    if (request.body.from == "savings") {
        accounts["savings"].balance =- amount;
        accounts["checking"].balance += amount;
    }
    writeJSON();
    response.render('transfer', { message: "Transfer Completed" });


});
router.post('/payment', (request, response) => {
    
    const amount = parseInt(request.body.amount);
    accounts.credit.balance -= amount;
    accounts.credit.available += amount
    
    writeJSON();
    response.render('payment', { message: "Payment Successful", account: accounts.credit });

});

module.exports = router; 