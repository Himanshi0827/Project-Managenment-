const mongoose = require("mongoose");

const AutoIncrement = require('mongoose-auto-increment');
AutoIncrement.initialize(mongoose.connection);

const FileSchema = new mongoose.Schema({
  fileNumber: {
    type: Number,
  },
  projectNumber: {
    type: Number,
    ref: "Project",
    required: true,
  },
  // projectNumber: String,//reference se aayega
  projectTitle: {
    type: String,
    ref: "Project",
    required: true,
  },
  // projectName: String,
  templateName: String,
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  versions: [
    {
      title: String,
      description: String,
      data: Array,
      version: { type: Number, unique: true },
      versionNum: { type: String },
      createdAt: { type: Date, default: Date.now },
      updatedAt: Date,
    },
  ],
});


cpSchema.plugin(AutoIncrement.plugin, { model: 'File', field: 'version' });

module.exports = mongoose.model("File", FileSchema);
