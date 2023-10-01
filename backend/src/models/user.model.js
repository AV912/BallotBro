const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        trim: true
    },
    firstName : {
        type: String,
        required: true,
        trim: true
    },
    lastName : {
        type : String,
        required: true,
        trim : true
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    groups: [{
        group_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group'
        },
        traits: [String],
        role: {
            type: String,
            enum: ['member', 'organizer', 'candidate'],
            default: 'member'
        }

    }]
});


userSchema.methods.encryptPassword = async password => {
    let salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
