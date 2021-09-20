const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const domPurify = createDomPurify(new JSDOM().window);
const reviewsSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  developerID: {
    type: String,
    required: true,
  },
});
// requestSchema.pre("validate", function () {
//   if (this.createdat) {
//     this.slug = slugify(this.createdat, { lower: true, strict: true });
//   }
// });

module.exports = mongoose.model("Reviews", reviewsSchema);
