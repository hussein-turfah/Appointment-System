const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const createToken = require('../utils/createtoken');


exports.login = async (req, res, next) => {
    try {
      // Check if email and password are provided
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({ success: false, message: "Please provide both email and password." });
      }
  
      // Check if user exists
      const user = await User.findOne({ email: req.body.email });
  
      // If user does not exist or password is incorrect
      if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).json({ success: false, message: "Incorrect email or password." });
      }
  
      // Generate token
      const token = createToken(user._id);
  
      // Remove password from user object
      delete user._doc.password;
  
      // Send success response with user data and token
      res.status(200).json({ success: true, data: user, token });
    } catch (error) {
      // Handle errors
      console.error("Error in login:", error);
      res.status(500).json({ success: false, message: "An unexpected error occurred." });
    }
  };
  
