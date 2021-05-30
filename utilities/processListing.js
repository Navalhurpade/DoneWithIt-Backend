const fs = require("fs");

const processListing = (listing, images) => {
  const data = { ...listing, price: parseFloat(listing.price) };

  if (listing.location != undefined) {
    data.location = JSON.parse(listing.location);
  }

  data.images = images.map((fileName) => {
    const thumb = fs.readFileSync(`public/assets/${fileName}_thumb.jpg`);
    const full = fs.readFileSync(`public/assets/${fileName}_full.jpg`);
    return {
      fullImg: { imgBuffer: full, contentType: ".jpg" },
      thumbImg: { imgBuffer: thumb, contentType: ".jpg" },
    };
  });

  return data;
};

module.exports = processListing;
