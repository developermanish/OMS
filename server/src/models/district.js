const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema({
    orgid: {
        type: String,
        required: true
    },
    stateid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State'
    }
});

const District = mongoose.model("District", DistrictSchema);
module.exports = District;


