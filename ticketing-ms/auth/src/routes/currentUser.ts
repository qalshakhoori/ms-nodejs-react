import express from 'express';
import { currentUserMd } from '../middlewares/current-user-md';
const router = express.Router();

router.get('/api/users/currentUser', currentUserMd, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
