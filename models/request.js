const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const domPurify = createDomPurify(new JSDOM().window);
const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  description: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  category: {
    type: String,
    require: true,
    min: 10,
  },
  lastdate: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  amount: {
    type: String,
    required: true,
    max: 255,
  },
  postedby: {
    type: String,
    required: true,
    max: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
// requestSchema.pre("validate", function () {
//   if (this.createdat) {
//     this.slug = slugify(this.createdat, { lower: true, strict: true });
//   }
// });

module.exports = mongoose.model("Request", requestSchema);
