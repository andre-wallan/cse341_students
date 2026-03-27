require('dotenv').config();

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');

const connectDB = require('./db/connect');
const studentRoutes = require('./routes/students');
const authRoutes = require('./routes/isAuthenticatede');
const courseRoutes = require('./routes/courses'); // ✅ ADD THIS

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();

// Middleware (ORDER MATTERS)
app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.send('🚀 Hello Students API is running...');
});

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes); // ✅ REQUIRED for rubric

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// DB & Server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error(err));