const config = require("config");

const mapper = (listing) => {
  // const baseUrl = config.get("assetsBaseUrl");
  const baseUrl = `http://${
    require("os").networkInterfaces().wlp3s0[0].address
  }:9000/assets/`;
  const mapImage = (image) => ({
    url: `${baseUrl}${image.fileName}_full.jpg`,
    thumbnailUrl: `${baseUrl}${image.fileName}_thumb.jpg`,
  });

  return {
    ...listing,
    images: listing.images.map(mapImage),
  };
};

module.exports = mapper;
