const express = require("express");
const router = express.Router();

const usersStore = require("../store/users");
const User = require("./../models/Users");
const listingsStore = require("../store/listings");
const auth = require("../middleware/auth");

router.get("/:id", auth, (req, res) => {
  const userId = parseInt(req.params.id);
  // const user = usersStore.getUserById(userId);
  const user = User.findById(userId);
  if (!user) return res.status(404).send({ error: "User Not found" });

  const listings = listingsStore.filterListings(
    (listing) => listing.userId === userId
  );

  res.send({
    id: user.id,
    name: user.name,
    email: user.email,
    listings: listings.length,
  });
});

module.exports = router;
