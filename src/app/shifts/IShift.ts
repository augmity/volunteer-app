import { Person } from '../people/Person';

export interface IShift {
  id: string;
  name: string;
  description: string;
  fromDateTime: Date;
  toDateTime: Date;
  minPeople?: number;
  maxPeople?: number;
  people?: string[];
  color?: string;
}
