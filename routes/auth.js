const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const usersStore = require("../store/DB/UserManager");
const validateWith = require("../middleware/validation");
const bcrypt = require("bcrypt");

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
};

router.post("/", validateWith(schema), async (req, res) => {
  const { email, password } = req.body;
  const userEmail = email.toLowerCase();

  const foundUser = await usersStore.findUserByEmail(userEmail);

  if (!foundUser) {
    return res.status(404).send({ error: "Invalde email or password !" });
  }
  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    return res.status(400).send({ error: "Invalde email or password !" });
  }

  const token = jwt.sign(
    {
      userId: foundUser._id,
      name: foundUser.name,
      email: userEmail,
      listings: foundUser.listings,
      gender: foundUser.gender,
    },
    process.env.PRIVET_KEY
  );
  res.send(token);
});

module.exports = router;
