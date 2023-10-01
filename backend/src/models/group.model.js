const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type:String,
        required: true,
        trim: true
    },
    accessCode: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    organizerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    candidates: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    guidingQuestions: {
        type: [String]
    },
    status : {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    }
});

module.exports = mongoose.model('Group', groupSchema);