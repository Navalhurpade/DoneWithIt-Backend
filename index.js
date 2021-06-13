require("dotenv").config();
const express = require("express");
const categories = require("./routes/categories");
const listings = require("./routes/listings");
const listing = require("./routes/listing");
const users = require("./routes/users");
const user = require("./routes/user");
const auth = require("./routes/auth");
const my = require("./routes/my");
const messages = require("./routes/messages");
const expoPushTokens = require("./routes/expoPushTokens");
const helmet = require("helmet");
const mongoose = require("mongoose");
const compression = require("compression");
const config = require("config");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(compression());

app.get("/", (req, res) => {
  res.send("Congrats backend Working !");
});
app.use("/api/categories", categories);
// app.use("/api/listing", listing);
app.use("/api/listings", listings);
// app.use("/api/user", user);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/my", my);
app.use("/api/expoPushTokens", expoPushTokens);
app.use("/api/messages", messages);

const port = process.env.PORT || config.get("port");
var IP = require("os").networkInterfaces().wlp3s0[0].address;
// var IP = require("os").networkInterfaces().lo[0].address;

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: "DoneWithIt",
  },
  (error) => {
    if (error) return console.log(error);

    console.log("Connect MongoDB Cluster !");
    if (IP) {
      app.listen(port, IP, function () {
        console.log(`Server has started locally http://${IP}:${port}/`);
      });
    } else {
      app.listen(port, function () {
        console.log(`Server has started `);
      });
    }
  }
);
