const express = require("express");
const router = express.Router();

// Middleware
const { auth } = require("../middlewares/auth");

// Authenticated
const { signUp, signIn, checkAuth } = require("../controllers/auth");
router.post("/register", signUp);
router.post("/login", signIn);
router.get("/check-auth", auth, checkAuth);

//User
const {
  addUsers,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user");
router.post("/user", auth, addUsers);
router.get("/users", auth, getUsers);
router.patch("/user/:id", auth, updateUser);
router.delete("/user/:id", auth, deleteUser);

module.exports = router;
