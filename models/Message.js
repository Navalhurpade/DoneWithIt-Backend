const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  fromUserId: { type: mongoose.Types.ObjectId, ref: "User" },
  toUserId: { type: mongoose.Types.ObjectId, ref: "User" },
  listingId: { type: mongoose.Types.ObjectId, ref: "Listing" },
  content: String,
  id: Number,
  dateTime: { type: Message, default: Message.now() },
});

const Message = new mongoose.model("Message", messageSchema);

module.exports = Message;
