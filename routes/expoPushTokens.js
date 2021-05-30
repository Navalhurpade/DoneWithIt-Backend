const express = require("express");
const router = express.Router();
const Joi = require("joi");

const usersStore = require("../store/DB/UserManager");
const auth = require("../middleware/auth");
const validateWith = require("../middleware/validation");

const schema = { token: Joi.string().required() };

router.post("/", [auth, validateWith(schema)], async (req, res) => {
  const user = await usersStore.getUserById(req.user._id);

  if (!user) return res.status(400).send({ error: "Invalid user." });

  user.expoPushToken = req.body.token;
  console.log("User registered for notifications: ", user);
  res.status(201).send();
});

module.exports = router;
