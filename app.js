const express = require("express");
const app = express();
const freelanceRoute = require("./freelancego/allfiles");
const mainfilesRoute = require("./freelancego/mainfiles");
const contactfileRoute = require("./freelancego/contact");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const methodOverride = require("method-override");
mongoose.connect("mongodb://localhost/freelancego", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use(methodOverride("_method"));

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

app.use("/freelancego", freelanceRoute);
app.use("/mainfiles", mainfilesRoute);
app.use("/contact", contactfileRoute);
app.get("/", (req, res) => {
  res.render("index.ejs", {});
});
app.listen(5000);
