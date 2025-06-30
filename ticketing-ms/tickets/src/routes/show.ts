import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@qalshakhoori-ms/ticketing-ms-common';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).send({ error: 'Ticket ID is required' });
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.status(200).send(ticket);
});

export { router as showTicketRouter };
