import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import healthRouter from './routes/health.js';
import indicatorsRouter from './routes/indicators.js';
import vehiclesRouter from './routes/vehicles.js';

const app = express();
const port = process.env.PORT || 4000;
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/indicators', indicatorsRouter);
app.use('/api/vehicles', vehiclesRouter);

app.get('/', (_req, res) => res.json({ name: 'SNT API', status: 'ok' }));

app.listen(port, () => {
  console.log(`SNT API listening on http://localhost:${port}`);
});


