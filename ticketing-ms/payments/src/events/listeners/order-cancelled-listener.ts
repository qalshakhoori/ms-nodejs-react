import {
  Listener,
  OrderCancelledEvent,
  OrderStatus,
  Subjects,
} from '@qalshakhoori-ms/ticketing-ms-common';
import { queueGroupName } from './queueGroupName';
import { Order } from '../../models/order';
import { Message } from 'node-nats-streaming';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    msg.ack();
  }
}
