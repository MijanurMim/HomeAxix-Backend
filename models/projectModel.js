const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Project Name"],
    trim: true,
  },

  projectId: {
    type: String,
    required: [true, "Please Enter Project Id"],
  },

  description: {
    type: String,
    required: [true, "Please Enter Project Description"],
  },

  price: {
    type: Number,
    required: [true, "Please Enter Project Price"],
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please Enter Project Category"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
