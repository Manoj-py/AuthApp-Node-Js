const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, confirmpassword, role } = req.body;

    if (!password || !confirmpassword || !email || !name || !role) {
      return res.json({
        status: false,
        message: "All fields are mandatory",
      });
    }

    if (await User.findOne({ email: email })) {
      return res.json({
        status: false,
        message: "The email already exsists",
      });
    }
    if (password != confirmpassword) {
      return res.json({
        status: false,
        message: "passwords didnot match",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.json({
      Sucess: true,
      data: response,
      message: "User Created SucessFully",
    });
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: "Error in creating the user",
    });
  }
};
