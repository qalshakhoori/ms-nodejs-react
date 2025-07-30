import { Subjects } from './subjects';

export interface TicketCreatedEvent {
  subject: Subjects.TicktedCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
