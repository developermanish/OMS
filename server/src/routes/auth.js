const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");


router.post("/signup", authController.UserRegistration);

router.post("/signin", authController.authenticateUser);

router.post("/token", authController.checkToken);

router.post("/info", authController.getOrg);

module.exports = router;


