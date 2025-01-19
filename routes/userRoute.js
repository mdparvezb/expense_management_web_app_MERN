const express = require("express");
const { loginController, deleteController , registerController } = require("../controllers/userController");

// Router object
const router = express.Router();

// Routers
// POST => Login
router.post("/login", loginController);

// POST => Register
router.post("/register", registerController);

// Delete User
router.delete("/user/:id", deleteController);

module.exports = router;
