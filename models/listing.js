const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
  title: String,
  description: String,
  images: [{ imgBuffer: Buffer, contentType: String }],
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Catagory" },
  price: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: {
    latitude: Number,
    longitude: Number,
  },
});

const Listing = new mongoose.model("Listing", listingSchema);

module.exports = Listing;
