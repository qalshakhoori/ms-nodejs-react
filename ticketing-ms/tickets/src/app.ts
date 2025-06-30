import express from 'express';
import 'express-async-errors'; // This is to handle async errors in express routes
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import {
  currentUserMd,
  errorHandler,
} from '@qalshakhoori-ms/ticketing-ms-common';
import { createTicketRouter } from './routes/new'; // Import routes to ensure they are registered
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index'; // Import index route
import { updateTicketRouter } from './routes/update'; // Import update route

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

app.use(createTicketRouter); // Register the create ticket route
app.use(showTicketRouter); // Register the show ticket route
app.use(indexTicketRouter); // Register the index ticket route
app.use(updateTicketRouter); // Register the update ticket route

app.all('*', async (req, res) => {
  res.status(404).send('Not Found');
});

app.use(errorHandler);

export { app };
