const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ObjectId is automatically created
const memoSchema = new Schema(
    {
        title: { type: String, Required: true },
        description: { type: String, Required: true },
        refreshToken: String
    }
);

module.exports = mongoose.model('Memo', memoSchema);