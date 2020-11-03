const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema({
    orgid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const State = mongoose.model("State", StateSchema);
module.exports = State;
