const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");

//Adding a new tailor
async function handleGenrateNewUser (req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10) 

      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        addressOfShop: req.body.addressOfShop,
        // photoOfShop: req.file?.path, // save file path
        password: hashedPassword,
        experience: req.body.experience,
        contact: req.body.contact,
      });
  
      await newUser.save();
      console.log({ message: "✅ User registered successfully!", user: newUser });
      
      res.render("afterSignup", { message: "Account created successfully!" }); 
    } catch (err) {
      console.log({message: "❌ Error: " + err.message});
      
      res.status(500).json({ message: "❌ Error: " + err.message });
    }
}

//Get the Signup Form
async function handleSignupForm(req, res) {
    console.log({message : "Now we have came on the Signup Form"});
    res.render("signup");
}

//get the Login Form
async function handleLoginForm(req, res) {
    console.log({message:"Now we are in the Login Page"});
    const message = req.query.message; // from spinner redirect
  res.render("login", { message });
}

//Mechanism responsible for login
async function handleLogin( req,res) {
    try {
        const {username, password } = req.body;

        //checking if the user exists
        const user = await User.findOne({ username });
        if ( !user ) {
            return res.status(400).render("login",{message: "❌ User not found!", isUser : false })
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if ( !isMatch ) {
            return res.status(400).render("login",{ message: "❌ Invalid password!", isPassword: false})
        }

        //generate JWT
        const token = jwt.sign(
            { id : user._id, username: user.username },
            process.env.secret_key,
            { expiresIn: "1h"}
        );
        // res.status(200).json({ message : "✅ Login successful!" , token })
        
         // set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,    // JS cannot read cookie
      secure: false,     // set true if using HTTPS
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    // redirect to customer management page
      res.redirect("/customer/customerDetailManagement");
        
    } catch (err) {
      console.log(err);
      
        res.status(500).json({ message: "❌ Error: " + err.message });
    }
}

  module.exports = {
    handleGenrateNewUser,
    handleSignupForm,
    handleLogin,
    handleLoginForm
  }