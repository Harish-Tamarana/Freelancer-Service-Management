const express = require("express");
const router = express.Router();
const verify = require("./jwtvalidator");
const Request = require("../models/request");
const Bidding = require("../models/bidding");
const User = require("../models/users");

router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  let user = await User.findOne({ _id: req.params.id });
  //   res.render("contact.ejs", { user: user });
  anotherUser = user;
  console.log(anotherUser);
  res.send(user);
});
module.exports = router;
