import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './route/route.js';
import { connectDB, isMongoReady } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URLS = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175'
].filter(Boolean);

app.use(cors({ 
  origin: function (origin, callback) {
    if (!origin) {
      // allow non-browser requests like curl
      callback(null, true);
    } else if (origin.startsWith('http://localhost:517')) {
      // allow any Vite dev server port 5170-5179
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Backend server is running',
    database: isMongoReady() ? 'mongodb' : 'memory',
  });
});

app.use('/api', router);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
};

startServer();
