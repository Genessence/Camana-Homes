import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { router } from './routes/index.js';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({
    origin: ['http://localhost:8081', 'http://localhost:8083', 'http://127.0.0.1:8081', 'http://127.0.0.1:8083'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Visitor-Id']
  }));
  app.use(express.json());
  app.use(cookieParser());
  
  // Serve static images from the img folder
  app.use('/images', express.static(path.join(__dirname, '../../../img')));
  app.use(morgan('combined'));

  app.use('/api', router);
  // Multer requires no extra app-level config since we mount under uploads router
  return app;
}