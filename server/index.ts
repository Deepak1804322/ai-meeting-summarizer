import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router } from './routes.js';

const app = express();
app.use(express.json({ limit: '5mb' }));

const allowed = (process.env.ALLOWED_ORIGINS ?? '*').split(',');
app.use(cors({ origin: allowed.includes('*') ? true : allowed }));

app.get('/', (_, res) => res.send('Summarizer API is up.'));
app.use('/api', router);

const PORT = Number(process.env.PORT ?? 8080);
app.listen(PORT, () => {
  console.log(`API listening on :${PORT}`);
});
