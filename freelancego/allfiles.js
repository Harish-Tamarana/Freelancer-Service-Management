const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Request = require("../models/request");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const {
  registerValidation,
  loginValidation,
} = require("../validations/validation");
const request = require("../models/request");
router.get("/signin", (req, res) => {
  res.render("signin.ejs");
});

router.get("/join", (req, res) => {
  res.render("join.ejs");
});
router.post("/checkjoin", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.body);
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");
  const salt = await bycrypt.genSalt(10);
  if (req.body.password != req.body.confirmpassword) {
    return res.status(400).send("Password's Mismatch");
  }
  const hashedPassword = await bycrypt.hash(req.body.password, salt);
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    password: hashedPassword,
    category: req.body.category,
    question1: req.body.question1,
    question2: req.body.question2,
  });
  let request = await Request.find().sort({ lastdate: "desc" });

  console.log(user);
  try {
    let savedUser = await user.save();
    if (savedUser.category == "Developer") {
      res.render("developerpaymentpage.ejs", { savedUser: savedUser });
    } else {
      console.log(savedUser);
      res.render("content.ejs", { user: savedUser, request: request });
    }
  } catch (err) {
    res.status(400).send("User With Same Phonenumber Already Exists");
  }
});
router.post("/checksignin", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't found");
  const pw = await bycrypt.compare(req.body.password, user.password);
  if (!pw) return res.status(400).send("Password is wrong");
  const token = jwt.sign({ _id: user._id }, process.env.DB_TOKEN);
  let request = await Request.find().sort({ lastdate: "desc" });
  res.render("content.ejs", { user: user, request: request });
});
router.get("/postrequest/:id", async (req, res) => {
  user = await User.findById({ _id: req.params.id });
  console.log(user);
  res.render("post_request.ejs", { user: user });
});
router.get("/gotopaymentpage", (req, res) => {
  res.render("payment.ejs");
});
router.post("/savedPost", async (req, res) => {
  console.log(req.body);
  let idval = req.body.id;
  let user = await User.findById({ _id: idval });
  let requestPost = new Request({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    lastdate: req.body.lastdate,
    amount: req.body.amount,
    postedby: user.name,
  });
  try {
    let savedPost = await requestPost.save();
    let request = await Request.find().sort({ lastdate: "desc" });
    res.render("content.ejs", { user: user, request: request });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something Went Wrong");
  }
});
router.post("/checkcomplaints", (req, res) => {
  res.redirect("/");
});
router.get("/complaints", (req, res) => {
  res.render("complaints.ejs");
});
router.get("/updatepassword", (req, res) => {
  res.render("updatepassword.ejs");
});
router.put("/update", async (req, res) => {
  let email = req.body.email;
  let question1 = req.body.question1;
  let question2 = req.body.question2;
  let password = req.body.password;
  let confirmpassword = req.body.confirmpassword;
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).send("Email or phone number doesn't exist");
  }
  if (question1 != user.question1) {
    return res.status(400).send("Invalid Attempt");
  }
  if (question2 != user.question2) {
    return res.status(400).send("Invalid Attempt");
  }
  if (password != confirmpassword) {
    return res.status(400).send("Password Mismatch");
  }

  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(req.body.password, salt);
  user.password = hashedPassword;
  await user.save();
  res.render("signin.ejs");
});
router.post("/showbycategory/:id", async (req, res) => {
  let searchbyvalue = req.body.searchbyvalue;
  let request = await Request.find({ category: searchbyvalue });
  let user = await User.findById({ _id: req.params.id });
  res.render("content.ejs", { request: request, user: user });
});
router.get("/alldata/:id", async (req, res) => {
  let request = await Request.find();
  let user = await User.findById({ _id: req.params.id });
  res.render("content.ejs", { request: request, user: user });
});
module.exports = router;
