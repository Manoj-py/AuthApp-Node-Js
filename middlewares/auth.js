const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      res.status(404).json({
        sucess: false,
        message: "Token missing",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECERT);
      req.user = decode;
    } catch (err) {
      return res.status(404).json({
        sucess: false,
        message: "Token verification failed",
      });
    }
    next();
  } catch (err) {
    return res.status(404).json({
      sucess: false,
      message: "An Error occured while fetching the token",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role != "student") {
      return res.status(401).json({
        sucess: false,
        message: "Your not authoraised to acess the route",
      });
    }
    next();
  } catch (err) {
    return res.status(404).json({
      sucess: false,
      message: "An Error while acessing the Student Route through token",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    const { role } = req.user;

    if (role != "admin") {
      return res.status(401).json({
        sucess: false,
        message: "Your not authoraised to acess the route",
      });
    }
    next();
  } catch (err) {
    return res.status(404).json({
      sucess: false,
      message: "An Error while acessing the Student Route through token",
    });
  }
};
