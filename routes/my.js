const express = require("express");
const router = express.Router();

const listingStore = require("../store/DB/listingsManeger");
const auth = require("../middleware/auth");

router.get("/listings", auth, (req, res) => {
  const foundMyListings = listingStore.getMyListings(req.user._id);

  if (!foundMyListings)
    return res.status(404).send({ error: "No Listings Found" });

  res.send({ data: foundMyListings });
});

module.exports = router;
