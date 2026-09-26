const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize DB & Seed Data
connectDB();

// API Routes
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/test-drives', require('./routes/testDriveRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Velocity Motors MERN API',
    timestamp: new Date()
  });
});

const startServer = (portToTry) => {
  const server = app.listen(portToTry, () => {
    console.log(`[Velocity Motors Server] Running on http://localhost:${portToTry}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[Velocity Motors Server] Port ${portToTry} is already in use. Retrying on port ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('[Velocity Motors Server] Error starting server:', err);
    }
  });
};

startServer(PORT);
