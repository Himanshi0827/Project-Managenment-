const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema({
    requirementNo: { type: String, required: true },
    requirementDate: { type: Date, required: true },
    requirementChangeNo: { type: String, required: true },
    changeDate: { type: Date, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    requirementGatheredBy: { type: String, required: true },
    modeOfReceipt: { type: String, required: true },
    providedBy: { type: String, required: true },
    requirementAcceptance: { type: Boolean, required: true },
    actionsToBeTaken: { type: String, required: true },
    responsibility: { type: String, required: true },
    expectedDateOfDelivery: { type: Date, required: true },
    status: { type: String, required: true },
    requirementOutputName: { type: String, required: true },
    dependency: { type: String, required: true },
    impactOfNewRequirements: { type: String, required: true },
    remarks: { type: String, required: true }
});

const Requirement = mongoose.model('Requirement', requirementSchema);

module.exports = Requirement;
