const express = require('express');
const multer = require('multer');
const axios = require('axios');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use original file name
    }
});

const upload = multer({ storage: storage });

// Define the route for parsing resumes
router.post('/parse-resume', upload.single('resume'), (req, res) => {
    // Logic to parse the resume goes here
    // Example: const parsedData = parseResume(req.file);
    res.json({ message: 'Resume parsed successfully!', data: req.file });
});

// New endpoint for LLM
router.post('/llm', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:8501/your_llm_endpoint', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling LLM:', error);
        res.status(500).send('Error connecting to LLM');
    }
});

// New endpoint for LLM
router.post('/llm', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/your_llm_endpoint', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling LLM:', error);
        res.status(500).send('Error connecting to LLM');
    }
});

module.exports = router;
