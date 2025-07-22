import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@qalshakhoori-ms/ticketing-ms-common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicktedCreated = Subjects.TicktedCreated;
}
