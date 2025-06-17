import express from 'express';
import 'express-async-errors'; // This is to handle async errors in express routes
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/currentUser';
import { signupRouter } from './routes/signup';
import { singinRouter } from './routes/signin';
import { singoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.set('trust proxy', true); // Trust the proxy (ingress-nginx) to allow secure cookies
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', // Use secure cookies in production
  })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(singinRouter);
app.use(singoutRouter);

app.use(errorHandler);

export { app };
