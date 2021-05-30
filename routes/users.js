const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
  getUsers,
  findUserByEmail,
  storeUser,
} = require("../store/DB/UserManager");
const validateWith = require("../middleware/validation");
const bcrypt = require("bcrypt");
const slatingRounds = 10; // DO NOT CHANGE, WILL BRECK OLD STORED PASSWORD

const schema = {
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
};

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

router.post("/", validateWith(schema), async (req, res) => {
  const { name, email, password } = req.body;

  // making Case insensitive
  const userEmail = email.toLowerCase().trim();
  const userName = capitalizeFirstLetter(name).trim();

  const user = { name: userName, email: userEmail, password };
  const foundUser = await findUserByEmail(userEmail);

  if (foundUser) {
    res.status(409).send({ error: "User exist" });
    return;
  }

  const hashedPass = await bcrypt.hash(user.password, slatingRounds);

  const newUser = {
    email: userEmail,
    name: userName,
    password: hashedPass,
  };

  storeUser(newUser);

  res.status(201).send({ ok: "Registerded new user " });
  return;
});

router.get("/", (req, res) => {
  const allUsers = getUsers();
  return res.send(allUsers);
});

module.exports = router;
