const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema(
  {
    projectNumber: {
      type: Number,
      ref: "Project",
      required: true,
    },
    requirementNumber: {
      type: String,
      unique: true,
      required: true,
    },
    requirementDate: {
      type: Date,
      required: true,
    },
    requirementChangeNumber: {
      type: String,
      unique: true,
      default: null,
      required : true,
    },
    changeDate: {
      type: Date,
      default: null,
      required : true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    requirementGatheredBy: {
      type: String,
      required: true,
    },
    modeOfReceipt: {
      type: String,
      required: true,
    },
    providedBy: {
      type: String,
      required: true,
    },
    requirementAcceptance: {
      type: String,
      enum: ["Yes", "No"],
      
    },
    actionsToBeTaken: {
      type: String,
      
    },
    responsibility: {
      type: String,
      required: true,
    },
    expectedDateOfDelivery: {
      type: Date,
      
    },
    status: {
      type: String,
      required: true,
    },
    requirementOutputName: {
      type: String,
      
    },
    dependency: {
      type: String,
      
    },
    impactOfNewRequirementsOrChanges: {
      type: String,
      
    },
    remarks: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Requirement",
  }
);

// Middleware to increment requirementNumber and requirementChangeNumber
requirementSchema.pre("save", async function (next) {
  const requirement = this;

  if (requirement.isNew) {
    // Generate unique requirementNumber
    const projectNumber = requirement.projectNumber;
    const count = await Requirement.countDocuments({ projectNumber });

    const requirementCount = count + 1;
    const mainPart = `R${String(projectNumber).padStart(2, "0")}.00.`;
    const lastPart = String(requirementCount % 100).padStart(2, "0");
    const middlePart = String(Math.floor(requirementCount / 100)).padStart(
      2,
      "0"
    );

    requirement.requirementNumber = `${mainPart}${middlePart}.${lastPart}`;
  }

  next();
});

// Create the Requirement model from the schema
module.exports =  mongoose.model("Requirement", requirementSchema);

