const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
    title: {
        type:String,
        required :true
    },
    link: {
        type:String,
        required :true
    },
    summary: {
        type:String,
        required :true
    },
    saved: {
        type:String,
        required :true,
        default: false
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }

})

const Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;