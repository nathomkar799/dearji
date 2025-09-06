const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploads'); 
const { handleGenrateNewUser, handleLogin } = require("../controllers/user")

//Signs up with some details, a photo of shop for verification
router.post('/signup', upload.single("photoOfShop"), handleGenrateNewUser);

//Login mechanism
router.post('/login', handleLogin)
// router.get('/login', handleLogin)

module.exports = router;