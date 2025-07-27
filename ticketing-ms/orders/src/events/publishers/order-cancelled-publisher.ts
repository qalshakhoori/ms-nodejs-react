import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from '@qalshakhoori-ms/ticketing-ms-common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
