const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema({
  queryNumber: { type: Number, unique: true, required: true },
  projectNumber: { type: String, required: true,ref: "Project" },
  requirementNumber: { type: String, required: true ,ref: "Requirement"},
  dateOfGeneration: { type: Date, default: Date.now },
  description: { type: String, required: true },
  to: { type: String, required: true},
  from: { type: String, required: true },
});

const QueryModel = mongoose.model("Query", QuerySchema);

module.exports = QueryModel;
