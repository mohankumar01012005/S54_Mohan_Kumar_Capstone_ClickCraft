const mongoose = require('mongoose')

const TemplateSchema = new mongoose.Schema(
  {
    Preview: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
    Category: {
      type: [String],
      required: true,
    },
    Likes: {
      type: Number,
      default: 0,
    },
    Views: {
      type: Number,
      default: 0,
    }
  }
)

const Templates = mongoose.model("Templates", TemplateSchema);

module.exports = Templates