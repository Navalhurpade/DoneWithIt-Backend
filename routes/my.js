const express = require("express");
const router = express.Router();

const listingStore = require("../store/DB/listingsManeger");
const auth = require("../middleware/auth");
// const listingMapper = require("../mappers/listings");

router.get("/listings", auth, (req, res) => {
  // const listings = listingsStore.filterListings(
  //   listing => listing.userId === req.user.userId
  // );

  // const resources = listings.map(listingMapper);
  // res.send(resources);

  const foundMyListings = listingStore.getMyListings(req.user._id);

  if (!foundMyListings)
    return res.status(404).send({ error: "No Listings Found" });

  res.send({ data: myListings });
});

module.exports = router;
