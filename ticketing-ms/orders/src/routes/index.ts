import express, { Request, Response } from 'express';
import { requireAuth } from '@qalshakhoori-ms/ticketing-ms-common';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({ userId: req.currentUser!.id }).populate(
    'ticket'
  );

  res.send(orders); // Send the orders back in the response
});

export { router as indexOrdersRouter };
