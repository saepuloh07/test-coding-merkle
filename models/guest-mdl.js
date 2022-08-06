const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    note: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Guest', guestSchema)