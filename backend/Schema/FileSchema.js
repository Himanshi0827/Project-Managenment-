const mongoose = require("mongoose");
const FileSchema = new mongoose.Schema({
  fileNumber :{
    type:Number,
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
        version: {type :String, unique:true},
        createdAt: { type: Date, default: Date.now },
        updatedAt: Date,
        
      },
    ],
  });
  module.exports = mongoose.model("File", FileSchema);