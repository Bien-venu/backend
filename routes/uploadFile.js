const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3001;

// Set up CORS middleware
app.use(cors());

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be saved in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Appending unique timestamp to filenames
  },
});
const upload = multer({ storage: storage });

// POST endpoint for file upload
app.post('/upload', upload.array('file', 5), (req, res) => {
  const files = req.files.map(file => ({
    filename: file.filename,
    originalname: file.originalname,
    path: file.path,
  }));
  // Here you can process the uploaded files and send a response
  res.json({ links: files.map(file => '/uploads/' + file.filename) }); // Assuming links are URLs to uploaded files
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
