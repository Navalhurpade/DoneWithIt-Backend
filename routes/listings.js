const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");
const fs = require("fs");

const listingManeger = require("../store/DB/listingsManeger");
const categoriesStore = require("../store/DB/catergeryManeger");
const validateWith = require("../middleware/validation");
const auth = require("../middleware/auth");
const imageResize = require("../middleware/imageResize");
const processListing = require("../utilities/processListing");
const { updateUser } = require("../store/DB/UserManager");

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 720 * 720 },
});

const schema = {
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  price: Joi.number().required().min(1),
  categoryId: Joi.string().required(),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).optional(),
  userId: Joi.string().required(),
  listings: Joi.string().optional(),
};

const validateCategoryId = async (req, res, next) => {
  const id = req.body.categoryId;

  const allCategores = await categoriesStore.getCategories();
  const found = allCategores.filter((c) => c._id == id);

  if (found.length == 0) {
    return res.status(404).send({ error: "Invalid categoryId provided !" });
  } else next();
};

router.get("/", async (req, res) => {
  //can populate listings by passing path  "categoryId userId"
  const listings = await listingManeger.getAllListings("userId");

  res.send(listings);
});

router.post(
  "/",
  [
    // Order of these middleware matters.
    // "upload" should come before other "validate" because we have to handle
    // multi-part form data. Once the upload middleware from multer applied,
    // request.body will be populated and we can validate it. This means
    // if the request is invalid, we'll end up with one or more image files
    // stored in the uploads folder. We'll need to clean up this folder
    // using a separate process.
    // auth,
    auth,
    upload.array("images", 3),
    validateWith(schema),
    validateCategoryId,
    imageResize,
  ],

  async (req, res) => {
    const listing = processListing(req.body, req.images);
    //Store Listing to DB and provides callback on upload sucsess !
    listingManeger.storeListing(listing, () => {
      //Clearing memmory on upload finish !!!
      req.images.map((fileName) => {
        fs.unlinkSync(`public/assets/${fileName}_full.jpg`);
        fs.unlinkSync(`public/assets/${fileName}_thumb.jpg`);

        fs.unlinkSync(`uploads/${fileName}`);
      });
    });

    updateUser(listing.userId);

    res.status(201).send({ ok: "Listing Stored to DB" });
  }
);

module.exports = router;
