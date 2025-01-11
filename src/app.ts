/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import express from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/Router';



const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use(globalErrorHandler);
app.use(notFound)

export default app;
