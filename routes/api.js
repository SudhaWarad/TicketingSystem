
// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Ticket = require('../models/ticketlog');

// Routes
Ticket.methods(['get', 'put', 'post', 'delete']);
Ticket.register(router, '/tickets');

// Return router
module.exports = router;
