import express from 'express';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/currentUser';
import { signupRouter } from './routes/signup';
import { singinRouter } from './routes/signin';
import { singoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(singinRouter);
app.use(singoutRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Auth service listening on port 3000');
});
