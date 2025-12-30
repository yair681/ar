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
  grade: Number,
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

// Routes

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add student
app.post('/api/students', async (req, res) => {
  try {
    const { name, grade } = req.body;
    
    if (!name || grade === undefined) {
      return res.status(400).json({ error: 'Name and grade are required' });
    }

    const student = new Student({ name, grade });
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student grade
app.put('/api/students/:id', async (req, res) => {
  try {
    const { grade } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { grade },
      { new: true }
    );
    res.json(student);
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
});
