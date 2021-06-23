const express = require("express");
const router = express.Router();

const listingStore = require("../store/DB/listingsManeger");
const auth = require("../middleware/auth");

router.get("/listings", auth, async (req, res) => {
  const foundMyListings = await listingStore.getMyListings(req.user.userId);
  if (!foundMyListings)
    return res.status(404).send({ error: "No Listings Found" });

  res.send(foundMyListings);
});

module.exports = router;
