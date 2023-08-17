const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/createUser");
const { loginUser } = require("../controllers/loginUser");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");

router.post("/sign-up", createUser);
router.post("/log-in", loginUser);

router.get("/test", auth, (req, res) => {
  res.json({
    sucess: true,
    message: "Protected Auth function",
  });
});

router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    sucess: true,
    message: "Protected Student Route",
  });
});
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    sucess: true,
    message: "Protected Admin Route",
  });
});
module.exports = router;
