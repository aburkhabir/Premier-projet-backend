import express from 'express';
import dotenv from 'dotenv';
import { CommandController } from './controllers/commandcontroller';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

new CommandController(app);
  
app.listen(PORT)
