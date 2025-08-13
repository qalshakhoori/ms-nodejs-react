import express from 'express';
import 'express-async-errors'; // This is to handle async errors in express routes
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import {
  currentUserMd,
  errorHandler,
} from '@qalshakhoori-ms/ticketing-ms-common';
import { createChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', true); // Trust the proxy (ingress-nginx) to allow secure cookies
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', // Use secure cookies in production
  })
);

app.use(currentUserMd); // Middleware to check for current user session
app.use(createChargeRouter);
app.all('*', async (req, res) => {
  res.status(404).send('Not Found');
});

app.use(errorHandler);

export { app };
