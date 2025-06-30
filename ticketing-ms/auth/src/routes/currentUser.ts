import express from 'express';
import { currentUserMd } from '@qalshakhoori-ms/ticketing-ms-common';
const router = express.Router();

router.get('/api/users/currentUser', currentUserMd, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
