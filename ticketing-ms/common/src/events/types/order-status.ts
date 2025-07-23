export enum OrderStatus {
  // When the order has been created, but the user has not yet paid
  Created = 'created',

  // When the user has cancelled the order
  // When user tries to reservea ticket that is already reserved
  // When the order has expired
  Cancelled = 'cancelled',

  // When the user has reserved the ticket
  AwaitingPayment = 'awaiting:payment',

  // When the user has paid for the ticket
  Complete = 'complete',
}
