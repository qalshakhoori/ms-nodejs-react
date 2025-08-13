import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from '@qalshakhoori-ms/ticketing-ms-common';
import { queueGroupName } from './queueGroupName';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      version: data.version,
      price: data.ticket.price,
      userId: data.userId,
      status: OrderStatus.Created,
    });
    await order.save();

    msg.ack();
  }
}
