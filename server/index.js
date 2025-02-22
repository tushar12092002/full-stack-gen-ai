const express = require('express')
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Mock database (in-memory array)
let students = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// Routes

// Get all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// Add a new student
app.post('/api/students', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    email,
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});


// Search for a student by email
app.get('/api/students/search', (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: 'Email query parameter is required' });
  }

  const foundStudent = students.find((student) => student.email === email);
  if (!foundStudent) {
    return res.status(404).json({ error: 'Student not found' });
  }

  res.json(foundStudent);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
