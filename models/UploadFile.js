const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for uploaded files
const uploadedFileSchema = new Schema({
  filename: String,
  originalname: String,
  path: String,
});

// Create a model based on the schema
const UploadedFile = mongoose.model('UploadedFile', uploadedFileSchema);

module.exports = UploadedFile;
