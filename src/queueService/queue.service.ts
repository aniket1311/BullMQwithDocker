import { Queue, Worker } from 'bullmq';
import { Redis } from 'ioredis';
import { createUser } from '../services/user.service.js';
import dotenv from 'dotenv';

dotenv.config();

const connection = new Redis({
  port: +process.env.REDIS_PORT!,
  host: process.env.REDIS_HOST || 'localhost',
  db: 0,
  maxRetriesPerRequest: null,
});
const dataFetchQueue = new Queue(process.env.QUEUE_NAME || 'data-fetch-queue', {
  connection,
});
const worker = new Worker(
  process.env.QUEUE_NAME || 'data-fetch-queue',
  async (job) => {
    if (job.name === 'createUser') {
      await createUser();
    }
  },
  { connection }
);

worker.on('completed', (job) => {
  console.log(`Job ${job?.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} has failed with ${err?.message}`);
});

const scheduleDataFetch = async () => {
  await dataFetchQueue.add(
    'createUser',
    {},
    { repeat: { pattern: '*/30 * * * *' } }
  );
  console.log('Data fetch scheduled');
};

const closeQueue = async () => {
  try {
    await dataFetchQueue.close();
    console.log('BullMQ queue closed');
  } catch (err) {
    console.log('Failed to close RabbitMQ', err);
  }
};

export { scheduleDataFetch, closeQueue };
