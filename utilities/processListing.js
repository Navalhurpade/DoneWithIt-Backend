const fs = require("fs");
const util = require("./converter");

const processListing = (listing, images) => {
  const data = { ...listing, price: parseFloat(listing.price) };

  if (listing.location != undefined) {
    data.location = JSON.parse(listing.location);
  }

  data.images = images.map((fileName) => {
    let thumb = fs.readFileSync(`public/assets/${fileName}_thumb.jpg`);
    let full = fs.readFileSync(`public/assets/${fileName}_full.jpg`);

    return {
      thumbImg: util.getReadableImgSrc(thumb, ".jpg"),
      fullImg: util.getReadableImgSrc(full, ".jpg"),
    };
    // return {
    //   fullImg: { buffer: full, contentType: ".jpg" },
    //   thumbImg: { buffer: thumb, contentType: ".jpg" },
    // };
  });

  return data;
};

module.exports = processListing;
