const express = require("express");
const router = express.Router();
const verify = require("./jwtvalidator");
const Request = require("../models/request");
const Bidding = require("../models/bidding");
const User = require("../models/users");
const Reviews = require("../models/reivews");
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let request = await Request.findOne({ _id: id });
  let bidding = await Bidding.find();
  let user = await User.find();
  res.render("bidding.ejs", { request: request, bidding: bidding, user: user });
});
router.get("/biddingsection", (req, res) => {
  res.send("In the bidding section");
});
router.post("/saveBidding/:id", async (req, res) => {
  id = req.params.id;
  let request = await Request.findById({ _id: id });
  let user = await User.find();
  let biddingPost = new Bidding({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    amount: req.body.amount,
    requestID: req.body.requestID,
    developerID: req.body.developerID,
    name: req.body.name,
  });
  try {
    let biddingResult = await biddingPost.save();
    let bidding = await Bidding.find();
    res.render("bidding.ejs", {
      request: request,
      bidding: bidding,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something Went Wrong");
  }
});
router.get("/mainfiles/reviews/:id", async (req, res) => {
  reviewId = req.params.id;
  let reviews = await Reviews.find();

  res.render("reviews.ejs", { reviewId: reviewId, reviews: reviews });
});
router.post("/saveReview", async (req, res) => {
  let review = new Reviews({
    comment: req.body.comment,
    name: req.body.name,
    developerID: req.body.id,
  });
  try {
    let newreview = await review.save();
    let reviewId = newreview.developerID;
    let reviews = await Reviews.find();
    res.render("reviews.ejs", { reviewId: reviewId, reviews: reviews });
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
