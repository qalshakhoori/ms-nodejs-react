import {
  OrderCreatedEvent,
  OrderStatus,
} from '@qalshakhoori-ms/ticketing-ms-common';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listener';
import mongoose from 'mongoose';
import { Order } from '../../../models/order';

const setup = async () => {
  const listner = new OrderCreatedListener(natsWrapper.client);

  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    expiresAt: 'not important',
    userId: 'not important',
    status: OrderStatus.Created,
    ticket: {
      id: 'not important',
      price: 10,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listner, data, msg };
};

it('replicates the order info', async () => {
  const { listner, data, msg } = await setup();

  await listner.onMessage(data, msg);

  const order = await Order.findById(data.id);

  expect(order?.price).toEqual(data.ticket.price);
});

it('acks the message', async () => {
  const { listner, data, msg } = await setup();

  await listner.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
