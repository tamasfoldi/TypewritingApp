/// <reference path="../../references.ts" />

var mongoose = require("mongoose");

var LessonSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: "Path {PATH} is required",
        unique: true
    } ,
    name: {
        type: String,
        required: "Path {PATH} is required",
        unique: true
    },
    text: {
        type: String,
        required: "Path {PATH} is required"
    }
});


module.exports = mongoose.model("Lesson", LessonSchema);
