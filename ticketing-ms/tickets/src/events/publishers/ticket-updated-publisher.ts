import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@qalshakhoori-ms/ticketing-ms-common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
