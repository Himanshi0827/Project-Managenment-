const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-auto-increment');

// Initialize the auto-increment plugin with your mongoose connection
AutoIncrement.initialize(mongoose.connection);

const cpSchema = new mongoose.Schema({
  taskNumber: {
    type: Number,
    unique: true,
  },
  requirementNumber: {
    type: String,
    ref: "Requirement",
    required: true,
  },
  projectNumber: {
    type: Number,
    ref: "Project",
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  numberOfInputElements: {
    type: Number,
    enum: [0, 1],
    required: true,
  },
  numberOfTablesViews: {
    type: Number,
    enum: [0, 1],
    required: true,
  },
  interfaceClass: {
    type: Number,
    enum: [0, 1],
    required: true,
  },
  functionsLogic: {
    type: Number,
    enum: [0, 1],
    required: true,
  },
  rndComponent: {
    type: Number,
    enum: [0, 1],
    required: true,
  },
  CP: {
    type: Number,
    required: true,
  },
});

// Apply auto-increment plugin to taskNumber field
cpSchema.plugin(AutoIncrement.plugin, { model: 'CP', field: 'taskNumber' });


// Create the CP model from the schema
mongoose.model("CP", cpSchema);
