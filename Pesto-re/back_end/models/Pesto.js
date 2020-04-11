const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PestoSchema = new Schema({
    pestoId : {
        type : Number
    },
    posted_by : {
        type : String
    },
    timestamp: {
        type: Date,
        default:Date.now
    },
    post:{
        type: String
    },
    visible : [{type : String }]
});

module.exports = Pesto = mongoose.model("pesto",PestoSchema);
