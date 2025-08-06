import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@qalshakhoori-ms/ticketing-ms-common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
