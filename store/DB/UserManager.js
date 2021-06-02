const User = require("../../models/Users");

const getUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.log("Error while fetching users", error);
  }
};

const getUserById = async (id) => {
  const users = await getUsers();
  return users.filter((u) => u._id == id)[0];
};

const findUserByEmail = async (email) => {
  const users = await getUsers();
  const foundUser = users.filter((u) => u.email == email);
  return foundUser.length != 0 ? foundUser[0] : false;
};

const storeUser = (user) => {
  try {
    const newUser = new User(user);
    newUser.save(() => console.log("New User Stored in DB"));
  } catch (error) {
    console.log("Error while storing new User", error);
  }
};

const updateUser = async (userId) => {
  try {
    const foundUser = await User.findById(userId);

    console.log("found", foundUser);

    const updateQuery = { listings: foundUser.listings + 1 };
    await User.findByIdAndUpdate(userId, updateQuery);
    console.info("user Updated ");
  } catch (error) {
    console.log("Error while updating user ", error);
  }
};

module.exports = {
  getUserById,
  getUsers,
  findUserByEmail,
  storeUser,
  updateUser,
};
