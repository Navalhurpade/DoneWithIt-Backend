const Categery = require("../../models/Category");
const c = require("./../categories");

const getCategories = c.getCategories;

// const getCategories = async () => {
//   try {
//     return await Categery.find({});
//   } catch (error) {
//     console.log("error while fetching categiries ", error);
//   }
// };

const storeCategery = async (categery) => {
  try {
    const newCategery = await Categery(categery);
    newCategery.save();
    console.log("Added new category");
    return;
  } catch (error) {
    console.log("error while storing category", error);
  }
};

module.exports = { getCategories, storeCategery };
