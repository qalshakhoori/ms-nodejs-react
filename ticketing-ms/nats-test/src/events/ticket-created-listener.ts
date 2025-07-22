import { Message } from 'node-nats-streaming';
import {
  Listener,
  TicketCreatedEvent,
  Subjects,
} from '@qalshakhoori-ms/ticketing-ms-common';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicktedCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log('Event data!', data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.price);

    msg.ack();
  }
}
