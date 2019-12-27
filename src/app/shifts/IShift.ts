import { IPerson } from '../people/IPerson';

export interface IShift {
  id: string;
  name: string;
  fromDateTime: Date;
  toDateTime: Date;
  minPeople?: number;
  maxPeople?: number;
  people: IPerson[] | null;
  color?: string;
}