const Listing = require("../../models/listing");

const getAllListings = async (populate) => {
  try {
    return await Listing.find({}).populate(populate);
  } catch (error) {
    console.log("Error while fetching listings", error);
  }
};

const getMyListings = async (id) => {
  const listing = await getAllListings()
  const foundListing = listing.filter((l) => l._id === id);
  return foundListing.length !== 0 ? foundListing : null;
};

const storeListing = (listing, onStoreSucess) => {
  try {
    const newListing = new Listing(listing);
     newListing.save(() => {
      console.log("Stored new Listing");
      onStoreSucess();
    });
  } catch (error) {
    console.log("Error while storing listings", error);
    return false;
  }
};

module.exports = { getAllListings, getMyListings, storeListing };
