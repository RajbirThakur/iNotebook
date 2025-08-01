const mongoose = require('mongoose');
const { Schema } = mongoose;

// Below is how a schema is created
const notesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('notes', notesSchema); //This line creates a model named 'notes' with a schema-notesSchema
