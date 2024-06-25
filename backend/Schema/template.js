const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  templateName : { type: String,required: true },
});

const TemplateModel = mongoose.model("Template", TemplateSchema);

module.exports = TemplateModel;