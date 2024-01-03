import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import { DatabaseConfiguration } from './config/db_config.js';
import { scheduleDataFetch, closeQueue } from './queueService/queue.service.js';

dotenv.config();
const app = express();

const corsOpts = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['*'],
};

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 50000,
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors(corsOpts));
routes(app);
scheduleDataFetch();
const PORT = process.env.PORT || 3005;
DatabaseConfiguration.connection();
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

process.on('SIGINT', async () => {
  try {
    await closeQueue();
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  try {
    await closeQueue();
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
});

//  Both process.on() functions are called to close queue safely
