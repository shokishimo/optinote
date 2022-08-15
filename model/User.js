const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ObjectId is automatically created
const userSchema = new Schema(
    {
        username: { type: String, Required: true },
        password: { type: String, Required: true },
        email: { type: String, Required: true },
        refreshToken: String
    }
);

module.exports = mongoose.model('User', userSchema);