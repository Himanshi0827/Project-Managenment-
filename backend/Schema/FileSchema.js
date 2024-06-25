const mongoose = require("mongoose");
const FileSchema = new mongoose.Schema({
    projectNumber: String,
    projectName: String,
    templateName: String,
    createdBy: String,
    createdAt: { type: Date, default: Date.now },
    versions: [
      {
        version: String,
        createdAt: { type: Date, default: Date.now },
        updatedAt: Date,
        
      },
    ],
  });
  module.exports = mongoose.model("File", FileSchema);