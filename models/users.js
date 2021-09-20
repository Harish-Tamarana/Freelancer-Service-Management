const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const domPurify = createDomPurify(new JSDOM().window);
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  phonenumber: {
    type: String,
    required: true,
    min: 10,
  },
  password: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  category: {
    type: String,
    required: true,
    max: 255,
  },
  question1: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },

  question2: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  slug: {
    type: String,
    requierd: true,
    unique: true,
  },
});
userSchema.pre("validate", function () {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
});

module.exports = mongoose.model("User", userSchema);
