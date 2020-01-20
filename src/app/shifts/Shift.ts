export interface Shift {
  id: string;
  name: string;
  fromDateTime: Date;
  toDateTime: Date;
  minPeople?: number;
  maxPeople?: number;
  color?: string;
  job: string;
  location: string;
  people: string[];
}
