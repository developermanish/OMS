const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema({
    orgid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    stateid: {
        type: String,
        required: true
    },
    districtid: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,

    }

});

const Child = mongoose.model("Child", ChildSchema);
module.exports = Child;
