import express from 'express';
import cors from 'cors';
import { qrRouter } from './routes/qrRoutes.js';

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', qrRouter);

app.listen(PORT, () => {
  console.log(`QR Generator backend running at http://localhost:${PORT}`);
});
