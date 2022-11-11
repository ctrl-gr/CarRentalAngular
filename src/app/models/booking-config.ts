export interface Booking {
  id: number;
  startDate: Date;
  endDate: Date;
  startDateFormat ?: string;
  endDateFormat ?: string;
  username: string;
  licensePlate: string;
  approved: boolean;
}
