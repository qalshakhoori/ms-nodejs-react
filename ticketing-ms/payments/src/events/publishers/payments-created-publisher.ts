import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from '@qalshakhoori-ms/ticketing-ms-common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
