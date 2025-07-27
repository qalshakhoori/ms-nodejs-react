import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@qalshakhoori-ms/ticketing-ms-common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
