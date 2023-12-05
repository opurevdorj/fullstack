const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Note name is required"]
    },
    paragraph: {
        type: String,
        required: [true, "Note paragraph is required"]
    },
    description: {
        type: String,
        required: [true, "Note description is required"]
    },
    category: {
        type: String,
        required: [true, "Note category is required"]
    },
},
{
    timestamps: true,
}
);
module.exports = mongoose.model('Note',noteSchema);