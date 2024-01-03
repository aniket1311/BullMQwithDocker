# How to start project :-

- To start the project run command - npm start

- PORT: Localhost port
  REQUESTS_PER_BATCH: Batch created for insertion of data
  DB_CONNECTION_STRING: MongoDB connection string
  BASE_URL: Random user base API URL
  QUEUE_NAME: Queue name for billMQ
  REDIS_PORT: Redis port
  REDIS_HOST: Redis host

- Working :-

1. When project is started using npm start, server starts on port 3005 and scheduleDataFetch() function is also executed in this function, firstly a queue is created named `data-fetch-queue` then after that the `Worker` that was imported from `BillMQ` in that job name is matched and the `createUser` function is called to insert the data.

2. And in `/get-user` route the GET request is called and the following params can also be passed page, limit, sortBy, search.
