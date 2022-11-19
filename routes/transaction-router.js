const router = require('express').Router();
const TransactionController = require('../controllers/transaction-controller');
const {authorizationIsCustomer, authorizationIsAdmin} = require('../middlewares/authorization-middleware');
const TransactionHistory = require('../models/index');


router.post('/transactions', authorizationIsCustomer, TransactionController.update);
router.get('/transactions/user', authorizationIsCustomer, TransactionController.getTransactionHistory);
router.get('/transactions/admin', authorizationIsAdmin, TransactionController.getAllTransaction);
router.get('/transactions/:transactionId', TransactionController.getOneTransaction);

module.exports = router;