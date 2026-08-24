const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const connectDB = require('./db');
const User = require('./models/User');
const seedDatabase = require('./seed');

const startServer = async () => {
  // Connect to Database asynchronously so it doesn't block server startup
  connectDB().then(async () => {
    await seedDatabase();
  }).catch(err => console.error("MongoDB Connection Error:", err));
  const app = express();

  // Security Middleware
  app.use(helmet());
  app.use(cors({ origin: true, credentials: true })); // Allow all for local dev
  app.use(express.json({ extended: false }));
  app.use(cookieParser());

  // Rate Limiting for Auth
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use('/api/auth', authLimiter);

  // Define Routes
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/profile', require('./routes/profile')); 
  app.use('/api/jobs', require('./routes/jobs'));
  app.use('/api/company', require('./routes/company'));
  app.use('/api/recruiter/jobs', require('./routes/recruiterJobs'));
  app.use('/api/applications', require('./routes/applications'));

  const PORT = process.env.PORT || 5001;

  const server = app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));
  
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use.`);
      console.error(`⚠️  Another instance of the server is likely running in the background.`);
      console.error(`👉  To fix this on Windows, you can open Command Prompt as Admin and run:`);
      console.error(`    netstat -ano | findstr :${PORT}`);
      console.error(`    taskkill /PID <ProcessId> /F`);
      process.exit(1);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer();
