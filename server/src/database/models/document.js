const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    value1: {
      type: Number,
    },
    value2: {
      type: Number,
    },
    value3: {
      type: Number,
    },
    value4: {
      type: Number,
    },
    value5: {
      type: Number,
    },
    File: {
      filePath: {
        type: String,
        required: true,
        default: "bit.ly/3NgVNGV",
      },
      mimeType: {
        type: String,
        required: true,
        default: "image/jpeg",
      },
      fileSize: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
