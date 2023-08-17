const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        sucess: false,
        message: "Please fill username/passwword",
      });
    }
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        sucess: false,
        message: "User not found please Sign-Up",
      });
    }
    const payload = {
      email: user.email,
      name: user.name,
      role: user.role,
      id: user._id,
    };
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECERT, {
        expiresIn: "2h",
      });
      user = user.toObject();
      user.token = token; // Passing the token to the users
      user.password = undefined;
      return res
        .status(200)
        .cookie("token", token, {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        }) //passing the token into the cookie
        .json({
          sucess: true,
          user: user,
          message: "User Logged in Sucessfully",
        });
    } else {
      res.status(400).json({
        sucess: false,
        message: "Password incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      sucess: false,
      message: "Could not log in Please try again",
    });
  }
};
