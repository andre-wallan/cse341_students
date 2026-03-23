require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const studentRoutes = require('./routes/students');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);
// Debug logs
console.log('MongoDB URI defined:', process.env.MONGODB_URI ? 'Yes' : 'No');
console.log('PORT defined:', process.env.PORT ? 'Yes' : 'No');

// Connect DB safely
connectDB()
  .then(() => console.log('✅ Database connected'))
  .catch(err => {
    console.error('❌ DB connection failed:', err);
    process.exit(1);
  });

// CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Middleware
app.use(express.json());

// Logging
app.use((req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    }
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/students', studentRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server error' });
});

// 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});