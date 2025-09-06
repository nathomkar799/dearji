const express = require('express');
const router = express.Router();
const { handleAddNewCustomer, handleCustomerUpdate } = require('../controllers/customer')
const authMiddleware = require("../middlewares/auth")

//Add new customer
router.post('/', authMiddleware,handleAddNewCustomer)

//Updates the customer info
router.post('/:id', authMiddleware ,handleCustomerUpdate )


module.exports = router;