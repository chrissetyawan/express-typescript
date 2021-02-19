export interface IOffer {
  id: number;
  userId: number,
  contactId: number,
  contactDate: Date,
  receiveDate: Date,
}

export interface SendIOffer {
  userId: number,
  contactId: number,
}