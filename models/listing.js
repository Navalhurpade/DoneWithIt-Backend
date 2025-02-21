const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
  title: String,
  description: String,
  // images: [
  //   {
  //     thumbImg: { imgBuffer: Buffer, contentType: String },
  //     fullImg: { imgBuffer: Buffer, contentType: String },
  //   },
  // ],
  images: [
    {
      thumbImg: String,
      fullImg: String,
    },
  ],
  categoryId: Number,
  price: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: {
    latitude: Number,
    longitude: Number,
  },
  date: { type: Date, default: Date.now() },
});

const Listing = new mongoose.model("Listing", listingSchema);

module.exports = Listing;
