import { Subjects } from './subjects';

export interface TicketCreatedEvent {
  subject: Subjects.TicktedCreated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
