const express = require("express");
const router = express.Router();
const categoriesStore = require("../store/DB/catergeryManeger");

router.get("/", async (req, res) => {
  const categories = await categoriesStore.getCategories();
  res.send(categories);
});

router.post("/add", async (req, res) => {
  try {
    const categery = req.body;
    await categoriesStore.storeCategery(categery);
    res.status(200).send("Stored new categery");
  } catch (error) {
    console.log("error ehile storing category", error);
    res.status(500).send({ error: "something gone wrong" });
  }
});

module.exports = router;
