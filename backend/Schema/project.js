const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    projectManagerName: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    projectTitle: {
      type: String,
      required: true,
    },
    projectDesc: {
      type: String,
      required: true,
    },
    projectStatus: {
      type: String,
      required: true,
    },
    email: { type: String },
    dateOfCreation: {
      type: Date,
      required: true,
    },
    numberOfmembers: {
      type: Number,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    CP: {
      ref: "CP",
      type: Number,
      required: true,
    },
  },
  {
    collection: "Project",
  }
);
module.exports = mongoose.model("Project", projectSchema);
