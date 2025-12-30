require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
const mongoURI = 'mongodb+srv://hwbhhrt_db_user:rzqamd3SlHxHOHu9@cluster0.mfjy7xu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Schemas
const studentSchema = new mongoose.Schema({
  name: String,
  points: Number,
  grade: Number,  // Keep for backwards compatibility
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

// Middleware to normalize grade/points
const normalizeGradePoints = (doc) => {
  try {
    if (!doc) return {};
    if (doc.toObject) doc = doc.toObject();
    if (!doc.points && doc.grade !== undefined) {
      doc.points = doc.grade;
    }
    return doc;
  } catch (e) {
    console.error('Error normalizing:', e);
    return doc;
  }
};

// Routes

// Get all students with their points
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    if (!students || !Array.isArray(students)) {
      return res.json([]);
    }
    const normalized = students.map(normalizeGradePoints);
    res.json(normalized);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.json([]);
  }
});

// Add student with points
app.post('/api/students', async (req, res) => {
  try {
    const { name, points } = req.body;
    
    if (!name || points === undefined) {
      return res.status(400).json({ error: 'Name and points are required' });
    }

    const student = new Student({ name, points });
    await student.save();
    res.json(normalizeGradePoints(student));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student points
app.put('/api/students/:id', async (req, res) => {
  try {
    const { points } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { points },
      { new: true }
    );
    res.json(normalizeGradePoints(student));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete student
app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Listening on http://localhost:${PORT}`);
});
