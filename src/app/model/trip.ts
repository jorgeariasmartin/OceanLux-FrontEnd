import { Yacht } from './yacht';

export interface Trip {
  id?: number;
  name: string;
  departure: string;
  price: number;
  duration_hours: number;
  description: string;
  startdate: string;
  enddate: string;
  yacht: Yacht;
}
