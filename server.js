import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your_secret_key';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/login')
    .then(() => console.log('MongoDB connected'))
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

// Define User and Task Schemas
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    task: { type: String, required: true },
    completed: { type: Boolean, default: false }
});
const Task = mongoose.model('Task', taskSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up paths for public files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Authentication Middleware
const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};

// Serve login and home HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// User login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

// Get all tasks for the logged-in user
app.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Add a new task for the logged-in user
app.post('/tasks', auth, async (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ message: 'Task description is required' });

    try {
        const newTask = new Task({
            userId: req.userId,
            task
        });
        await newTask.save();
        res.json(newTask);
    } catch (error) {
        res.status(500).send('Error creating task');
    }
});

app.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid task ID format' });
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if the task belongs to the logged-in user
        if (task.userId.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this task' });
        }

        // Use deleteOne instead of remove
        await Task.deleteOne({ _id: id });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error); // Log detailed error
        res.status(500).send('Error deleting task');
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
