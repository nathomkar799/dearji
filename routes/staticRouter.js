const express = require('express');
const { handleSignupForm, handleLoginForm } = require("../controllers/user")
const router = express.Router();
const {handleHomepage, handleCustomerDetailsQR} = require('../controllers/public');
const { handleSearchResult, handleCustomerDetailsSearchForm, handleCustomerDetailsForm, handleCustomerUpdateForm} = require('../controllers/customer')
const authMiddleware = require("../middlewares/auth");

//Gives homepage
router.get('/', handleHomepage);

//Gives Sign Up Form
router.get('/signupForm', handleSignupForm);

//Gives Login Form
router.get('/loginForm', handleLoginForm);

//Gives Customer Detail Management (Search, Add, Update):-> CRUD without D Form
router.get('/customerDetailManagement', authMiddleware,handleCustomerDetailsSearchForm);

//Gives Adding New Customer with Measurements Form
router.get('/addingCutomerDetailsForm', authMiddleware,handleCustomerDetailsForm);

//Gives the Customer Details after search
router.get('/search', authMiddleware,handleSearchResult);

//Gives the Customer Update form after the seacrhing
router.get('/updateCustomerDetailForm/:id', authMiddleware,handleCustomerUpdateForm)

//Gives the Customer Details after scanning QR redirecting to Customer Details
router.get('/:id', handleCustomerDetailsQR)

module.exports = router;